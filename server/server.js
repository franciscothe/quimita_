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


// Middlewares
app.use(express.json());
app.use(cors());
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
    senha: passwordHash
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
      msg: 'Token Inválido'
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