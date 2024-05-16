/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path') // Importe o módulo path
const http = require('http')
const User = require('./models/User')
const Server = require('socket.io').Server
const fs = require('fs')
const https = require('https')
const app = express()
const axios = require('axios');
const { Base64 } = require('js-base64');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Configuração do HTTPS
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'SSL/code.key')), // Certifique-se de ter um arquivo .key para a chave
  cert: fs.readFileSync(path.join(__dirname, 'SSL/code.crt'))
};

https.createServer(sslOptions, app).listen(5002, () => {
  console.log("Servidor HTTPS rodando na porta 5002");
});

// Configuração do servidor HTTP para redirecionar para HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { Location: `https://${req.headers.host}:${5002}${req.url}` });
  res.end();
}).listen(5001, () => {
  console.log('Servidor HTTP redirecionando para HTTPS na porta 5001');
});

// Configuração do caminho estático para servir o frontend
const buildPath = path.join(__dirname, '../Client/build');
app.use(express.static(buildPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.pcmsz7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log('Conectou ao Banco!')
  })
  .catch((err) => console.log(err))
//registrando usuario

app.post('/auth/register', async (req, res) => {
  const { nome, email, senha, confirmaSenha } = req.body;

  // Validação
  if (!nome) {
    return res.status(422).json({ msg: 'O nome é obrigatório' });
  }
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório' });
  }
  if (!senha) {
    return res.status(422).json({ msg: 'A senha é obrigatória' });
  }
  if (senha !== confirmaSenha) {
    return res.status(422).json({ msg: 'As senhas não conferem, tente novamente' });
  }

  // Checagem de existência de usuário
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(425).json({ msg: 'Por favor, utilize outro email' });
  }

  // Criação da senha criptografada
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);

  // Criação do usuário
  const user = new User({
    nome,
    email,
    senha: passwordHash,
    assinatura: false
  });

  try {
    await user.save();

    // Geração do token
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

    // Envio da resposta incluindo o token e a URL de redirecionamento
    res.status(201).json({
      msg: 'Usuário criado com sucesso!',
      token: token, // Envia o token como parte da resposta
      redirectUrl: '/user/perfil' // Informa a URL para a qual o cliente deve redirecionar o usuário
    });
  } catch (error) {
    res.status(500).json({ msg: 'Aconteceu um erro no servidor' });
  }
});
//login usuario
app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body

  //validation
  if (!email) {
    return res.status(422).json({
      msg: 'O email é obrigatório'
    })
  }
  if (!senha) {
    return res.status(422).json({
      msg: 'A senha é obrigatória'
    })
  }

  //checagem de existência de usuario
  const user = await User.findOne({
    email: email
  })
  if (!user) {
    return res.status(404).json({
      msg: 'Usuário não encontrado'
    })
  }

  //check if password match
  const checkPassword = await bcrypt.compare(senha, user.senha)

  if (!checkPassword) {
    return res.status(422).json({
      msg: 'Senha inválida'
    })
  }

  try {
    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id: user._id
      },
      secret
    )

    // Redireciona para a rota de perfil incluindo o ID do usuário como parâmetro na URL
    res.status(200).json({
      msg: 'Autenticação realizada com sucesso!',
      token,
      redirectUrl: `/user/perfil/`
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: 'Aconteceu um erro no servidor'
    })
  }
})

//check token
const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
        msg: 'Token não fornecido'
    });
}


  try {
    const secret = process.env.SECRET
    const decoded = jwt.verify(token, secret)
    req.user = decoded // Adiciona as informações do usuário decodificadas ao objeto de solicitação
    next()
  } catch (error) {
    res.status(400).json({
      msg: 'Tnao deu certo'
    })
  }
}

app.get('/user/perfil', checkToken, async (req, res) => {
  // Extrair o ID do usuário decodificado pelo middleware checkToken
  const userId = req.user.id;
    // Buscar informações do usuário usando o ID
  const user = await User.findById(userId).select('-senha'); // Exclui a senha do objeto retornado
  
  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado' });
  }
  
  res.status(200).json(user);
});

//limitação de acesso à rota de exercicios
app.get('/Sumario/L1/grupo1', checkToken, async (req, res) => {
  // O middleware checkToken já terá verificado e decodificado o token,
  // armazenando o resultado no objeto req (geralmente como req.user)
  const id = req.user.id
  try {
    const user = await User.findById(id, '-senha')
    if (!user) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      })
    }
    res
      .status(200)
      .json({
        msg: 'Acesso permitido à rota protegida',
        user: user.toObject()
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Erro interno do servidor'
    })
  }
})
app.get('/Sumario/L1/grupo2', checkToken, async (req, res) => {
  // O middleware checkToken já terá verificado e decodificado o token,
  // armazenando o resultado no objeto req (geralmente como req.user)
  const id = req.user.id
  try {
    const user = await User.findById(id, '-senha')
    if (!user) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      })
    }
    res
      .status(200)
      .json({
        msg: 'Acesso permitido à rota protegida',
        user: user.toObject()
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Erro interno do servidor'
    })
  }
})

app.get('/Sumario/*', checkToken, async (req, res) => {
  // O middleware checkToken já terá verificado e decodificado o token,
  // armazenando o resultado no objeto req (geralmente como req.user)
  const id = req.user.id
  try {
    const user = await User.findById(id, '-senha')
    if (!user) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      })
    }
    res
      .status(200)
      .json({
        msg: 'Acesso permitido à rota protegida',
        user: user.toObject()
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Erro interno do servidor'
    })
  }
})

//Completando informações do usuário
app.post('/user/perfil/adicionar-informacoes', checkToken, async (req, res) => {
  try {
    // Extrair as informações do corpo da requisição
    const { cpf, telefone, endereco, complemento, cep, cidade, estado } = req.body;

    // Encontrar o usuário pelo ID
    const user = await User.findById(req.user.id);

    // Se o usuário não for encontrado, retornar um erro
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    // Remover pontos e traços do CPF
    const cpfSemPontosTracos = cpf.replace(/[.-]/g, '');

    // Remover caracteres especiais e espaços do telefone
    const telefoneEdit = telefone.replace(/[-()\s]/g, '');

    // Remover traços do CEP
    const cepEdit = cep.replace(/[-\s]/g, '');

    // Atualizar as informações adicionais do usuário
    user.cpf = cpfSemPontosTracos;
    user.telefone = telefoneEdit;
    user.endereco = endereco;
    user.complemento = complemento;
    user.cep = cepEdit;
    user.cidade = cidade;
    user.estado = estado;

    // Salvar as informações atualizadas no banco de dados
    await user.save();

    // Responder com uma mensagem de sucesso
    res.status(200).json({ mensagem: 'Informações adicionais salvas com sucesso' });
    console.log(user)
  } catch (error) {
    console.error('Erro ao salvar informações adicionais do usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});



//criação da assinatura
app.post('/user/verifica-assinatura', checkToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Busca o usuário no banco de dados
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ assinatura: user.assinatura });
    console.log('Valor da assinatura retornado com sucesso:', user.assinatura);
  } catch (error) {
    console.error('Erro ao verificar assinatura do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


// Rota para lidar com o envio dos dados do usuário para a API da Pagar.me
app.post('/para-pagarme', checkToken, async (req, res) => {
  try {
    // userId pode ser acessado a partir do objeto de solicitação após o middleware checkToken
    const userId = req.user.id;

    // Buscar informações do usuário usando o ID
    const user = await User.findById(userId).select('-senha');
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Montar os dados do usuário para enviar para a API da Pagar.me
    const dadosUsuario = {
      name: user.nome,
      email: user.email,
      code: '001', 
      document: user.cpf,
      type: 'individual',
      document_type: 'CPF',
      address: {
        line_1: user.endereco,
        line_2: user.complemento,
        zip_code: user.cep,
        city: user.cidade,
        state: 'GO',
        country: 'BR' 
      },
      phones: {
        mobile_phone: {
          country_code: '55',
          area_code: user.telefone.substring(0, 2),
          number: user.telefone.substring(2)
        }
      }
    };

    // Enviar os dados para a API da Pagar.me
    const options = {
      method: 'POST',
      url: 'https://api.pagar.me/core/v5/customers',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfNWYwNjY2MGQ1YzkyNDRkYzg4NmU2YzNkNDcwNGIxOWM6'
      },
      data: dadosUsuario
    };
    // c2tfNWYwNjY2MGQ1YzkyNDRkYzg4NmU2YzNkNDcwNGIxOWM6
    // Enviar os dados para a API da Pagar.me
    const response = await axios.request(options);

    // Responder com os dados retornados pela API da Pagar.me
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error); // Log do erro para depuração
    if (error.response) {
      // O servidor respondeu com um status fora do intervalo 2xx
      console.log(error.response.data);
      res.status(500).json({ success: false, message: "Erro ao enviar dados", error: error.response.data });
    } else {
      // Algum outro erro ocorreu no processo de envio
      res.status(500).json({ success: false, message: "Erro interno", error: error.message });
    }
  }
});

app.post('/assinatura', checkToken, async (req, res) => {
  const { cardId } = req.body; // Obtenha o cardId do corpo da requisição
  
  // Extrair o ID do usuário decodificado pelo middleware checkToken
  const userId = req.user.id;

   try {
    // userId pode ser acessado a partir do objeto de solicitação após o middleware checkToken

    // Buscar informações do usuário usando o ID
    const user = await User.findById(userId).select('-senha');
    
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Montar os dados do usuário para enviar para a API da Pagar.me
    const dadosUsuario = {
      customer: {
        name: user.nome,
        type: 'individual',
        email: user.email,
        document: user.cpf
      },
      plan_id: 'plan_ePXlj5zuGnUxPod8',
      billing_address: {
        line_1: user.endereco,
        line_2: user.complemento,
        zip_code: user.cep,
        city: user.cidade,
        state: user.estado,
        country: 'BR'
      },
      payment_method: 'credit_card',
      card_token: cardId,
      metadata: {
        id: user._id
      }
    };

    const options = {
      method: 'POST',

      url: 'https://api.pagar.me/core/v5/subscriptions',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfNWYwNjY2MGQ1YzkyNDRkYzg4NmU2YzNkNDcwNGIxOWM6'
      },
      data: dadosUsuario
    };

    // Enviar os dados para a API da Pagar.me
    const response = await axios.request(options);

    // Atualizar o campo de assinatura do usuário para true
    user.assinatura = true;
    await user.save();
    return res.status(200).json({ msg: 'Assinatura realizada com sucesso' });

    // Redirecionar para a página de perfil de assinatura

  } catch (error) {
    console.error(error); // Log do erro para depuração
    return res.status(400).json({ msg: 'Revise os dados de pagamento' });

    // Redirecionar para a página de perfil de assinatura em caso de erro
  }
});






const corsOptions ={
  origin:'https://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}



app.use(cors(corsOptions));