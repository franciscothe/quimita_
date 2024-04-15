import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import {
  BtnEnviar,
  DivCriarConta,
  DivGeralLogin,
  LinkCriarConta,
  NavLogin,
  SmallButton,
  StyledInput
} from './styles'
import Logotipo from '../../components/Logo'
import { cores } from '../../styles'
import { Container } from '@mui/material' // Importar Container de '@mui/material'
import { useNavigate } from 'react-router-dom' // Importe useNavigate

const FormularioLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const navigate = useNavigate() // Inicialize useNavigate

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('https://localhost:5002/auth/login', {
        email: email,
        senha: senha
      })

      localStorage.setItem('token', response.data.token)
      //redirecionar para /perfil
      navigate('/user/perfil')
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg)
      } else {
        console.error('Erro ao fazer login:', error)
        alert(
          'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.'
        )
      }
    }

    setEmail('')
    setSenha('')
  }

  return (
    <Container>
      <NavLogin>
        <SmallButton to="/Sumario" color={cores.laranjaClaro}>
          LIÇÕES
        </SmallButton>
      </NavLogin>
      <DivGeralLogin>
        <Logotipo />
      </DivGeralLogin>

      <form onSubmit={handleSubmit}>
        <div>
          <StyledInput
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="E-mail"
          />
        </div>
        <div>
          <StyledInput
            type="password"
            id="senha"
            value={senha}
            onChange={handleSenhaChange}
            placeholder="Senha"
          />
        </div>

        <BtnEnviar type="submit">ACESSAR LIÇÕES</BtnEnviar>
      </form>
      <DivCriarConta>
        <LinkCriarConta to="/Cadastro"> CRIAR CONTA</LinkCriarConta>
        <LinkCriarConta to="/Cadastro"> RECUPERAR SENHA</LinkCriarConta>
      </DivCriarConta>
    </Container>
  )
}

export default FormularioLogin
