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


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    return res.status(422).json({ msg: 'Por favor, utilize outro email' });
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

    // Atualizar as informações adicionais do usuário
    user.cpf = cpf;
    user.telefone = telefone;
    user.endereco = endereco;
    user.complemento = complemento;
    user.cep = cep;
    user.cidade = cidade;
    user.estado = estado;

    // Salvar as informações atualizadas no banco de dados
    await user.save();

    // Responder com uma mensagem de sucesso
    res.status(200).json({ mensagem: 'Informações adicionais salvas com sucesso' });
  } catch (error) {
    console.error('Erro ao salvar informações adicionais do usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});


//criação da assinatura
app.post('/criar-assinatura', async (req, res) => {
  const { token, token_card } = req.body;

  try {
    // 1. Fazer requisição para obter informações do usuário com base no token
    const userDataResponse = await axios.get(`https:/localhost:5002/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const userData = userDataResponse.data;

    // 2. Montar o payload de assinatura com os dados do usuário e o token do cartão
    const payload = {
      customer: {
        name: userData.nome,
        type: 'individual',
        email: userData.email,
        document: userData.cpf,
        address: {
          line_1: userData.endereco,
          line_2: userData.complemento,
          zip_code: userData.cep,
          city: userData.cidade,
          state: userData.estado,
          country: 'BR'
        }
      },
      plan_id: 'plan_yKmZzVBUvUEzAGX7',
      payment_method: 'credit_card',
      card_token: token_card,
      credit_card: {
        installments: 1,
        statement_descriptor: 'Assinatura acesso aos exercicios',
        card: {
          billing_address: {
            line_1: userData.endereco,
            zip_code: userData.cep,
            city: userData.cidade,
            state: userData.estado,
            country: 'BR'
          }
        }
      },
      metadata: {
        id: userData._id
      }
    };

    // 3. Enviar o payload para a API do Pagarme para criar a assinatura
    const response = await axios.post('https://api.pagar.me/core/v5/subscriptions', payload);

    // 4. Retornar a resposta da API do Pagarme como resposta da rota
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    res.status(500).json({ error: 'Erro ao criar assinatura' });
  }
});


const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));