import { Container } from '@mui/material'
import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios' // Importe o axios
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

const FormularioLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Email:', email)
    console.log('Senha:', senha)

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email: email,
        senha: senha
      })

      // Após o login bem-sucedido, você pode fazer algo com o token retornado, como armazená-lo no localStorage
      localStorage.setItem('token', response.data.token)

      // Redirecionar o usuário para outra página, por exemplo, a página do perfil
      location.href = 'user/perfil'
      // window.location.href = '/perfil';
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
      </DivCriarConta>
    </Container>
  )
}

export default FormularioLogin
