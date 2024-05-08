import { useState } from 'react'
import { BtnEnviar, NavLogin, SmallButton, StyledInput } from '../Login/styles'
import { cores } from '../../styles'
import { Container } from '@mui/material'

const RecuperarSenha = () => {
  const [emailEnviado, setEmailEnviado] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Lógica para enviar o email de recuperação

    // Marca o email como enviado
    setEmailEnviado(true)
  }

  return (
    <Container>
      <NavLogin>
        <SmallButton to="/Sumario" color={cores.laranjaClaro}>
          LIÇÕES
        </SmallButton>
      </NavLogin>
      {emailEnviado ? (
        <p>Email enviado com sucesso.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-mail:</label>
            <StyledInput type="email" id="email" name="email" />
          </div>

          <BtnEnviar type="submit">Enviar Email de Recuperação</BtnEnviar>
        </form>
      )}
    </Container>
  )
}

export default RecuperarSenha
