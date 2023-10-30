import { Container } from '@mui/material'
import React, { useState, ChangeEvent, FormEvent } from 'react'
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
  const [usuario, setUsuario] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const handleUsuarioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsuario(event.target.value)
  }

  const handleSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Usuário:', usuario)
    console.log('Senha:', senha)
    setUsuario('')
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
            id="usuario"
            value={usuario}
            onChange={handleUsuarioChange}
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
        <BtnEnviar type="submit">ENTRAR</BtnEnviar>
      </form>
      <DivCriarConta>
        <LinkCriarConta to="/Cadastro"> CRIAR CONTA</LinkCriarConta>
      </DivCriarConta>
    </Container>
  )
}

export default FormularioLogin
