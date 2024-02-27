/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const AWS = require('aws-sdk')

//configurando json
app.use(express.json())

//configuração aws
AWS.config.update({
  accessKeyId: 'AKIAXYKJQYLZCEY6ZNXF',
  secretAccessKey: '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',
  region: 'sa-east-1'
})
const s3 = new AWS.S3()
//models
const User = require('./models/User')

const http = require('http')

// Defina as configurações do servidor EC2
const ec2Address = '15.228.202.76'
const ec2Port = 22 // Porta na qual o servidor EC2 está ouvindo

// Faça uma requisição HTTP para o servidor EC2
http
  .get(`http://${ec2Address}:${ec2Port}/`, (response) => {
    let data = ''

    // Concatene os dados recebidos
    response.on('data', (chunk) => {
      data += chunk
    })

    // Quando a resposta estiver completa, faça algo com os dados
    response.on('end', () => {
      console.log('Resposta do servidor EC2:', data)
    })
  })
  .on('error', (error) => {
    console.error('Erro ao conectar ao servidor EC2:', error)
  })

app.use(
  cors({
    origin: 'http://quimita.com.br.s3-website-sa-east-1.amazonaws.com'
  })
)

app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'bem-vindo a nossa API'
  })
})

//rota privada

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.pcmsz7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(3333)
    console.log('Conectou ao Banco!')
  })
  .catch((err) => console.log(err))

//registrando usuario

app.post('/auth/register', async (req, res) => {
  const { nome, email, senha, confirmaSenha } = req.body

  //validation
  if (!nome) {
    return res.status(422).json({
      msg: 'O nome é obrigatório'
    })
  }
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
  if (senha !== confirmaSenha) {
    return res.status(422).json({
      msg: 'As senhas não conferem, tente novamente'
    })
  }

  //checagem de existência de usuario
  const userExists = await User.findOne({
    email: email
  })
  if (userExists) {
    return res.status(422).json({
      msg: 'Por favor, utilize outro email'
    })
  }
  //create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(senha, salt)

  //create user
  const user = new User({
    nome,
    email,
    senha: passwordHash
  })
  try {
    await user.save()
    res.status(201).json({
      msg: 'Usuário criado com sucesso!'
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Aconteceu um erro no servidor'
    })
  }
})

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
    return res.redirect('local/Login')
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
  const id = req.user.id
  try {
    const user = await User.findById(id, '-senha')
    if (!user) {
      return res.status(404).json({
        msg: 'Usuário não encontrado'
      })
    }
    // Aqui você pode acessar as informações do usuário a partir de req.user
    res
      .status(200)
      .json({ msg: 'Acesso permitido à rota protegida', user: user.toObject() })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})

//limitação de acesso à rota de exercicios
app.get('/Sumario/L1/grupo1', checkToken, async (req, res) => {
  // O middleware checkToken já terá verificado e decodificado o token,
  // armazenando o resultado no objeto req (geralmente como req.user)
  const id = req.user.id
  try {
    const user = await User.findById(id, '-senha')
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' })
    }
    res
      .status(200)
      .json({ msg: 'Acesso permitido à rota protegida', user: user.toObject() })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})
app.get('/Sumario/L1/grupo2', checkToken, async (req, res) => {
  // O middleware checkToken já terá verificado e decodificado o token,
  // armazenando o resultado no objeto req (geralmente como req.user)
  const id = req.user.id
  try {
    const user = await User.findById(id, '-senha')
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' })
    }
    res
      .status(200)
      .json({ msg: 'Acesso permitido à rota protegida', user: user.toObject() })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Erro interno do servidor' })
  }
})
