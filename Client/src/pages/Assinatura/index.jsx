import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import {
  BarraFalha,
  BarraSucesso,
  BotaoIrAssinatura,
  DivAssinatura
} from './styles'
import { Botao, BotaoClaro } from '../../components/Botao/styles'
import { BotaoPerfil } from '../Perfil/styles'

const Assinatura = () => {
  const [assinaturaCompleta, setAssinaturaCompleta] = useState(null) // Alterado para null para indicar que a informação ainda não foi carregada

  useEffect(() => {
    const token = localStorage.getItem('token')

    fetch('https://localhost:5002/user/verifica-assinatura', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Definindo o estado de acordo com o valor de user.assinatura
        setAssinaturaCompleta(data.assinatura)
      })
      .catch((error) => {
        alert(error) // Exibir alerta com a mensagem de erro

        // Trate o erro conforme necessário
      })
  }, [])

  // Verifica se a informação já foi carregada
  if (assinaturaCompleta === null) {
    return <div>Carregando...</div>
  }

  // Renderiza de acordo com o valor de assinaturaCompleta
  return (
    <Container>
      {assinaturaCompleta ? (
        <>
          {' '}
          <DivAssinatura>
            <BarraSucesso>Assinatura realizada com sucesso!</BarraSucesso>

            <BotaoIrAssinatura to="/Sumario">
              {' '}
              Ir para as lições
            </BotaoIrAssinatura>
            <p>Para cancelar a assinatura clique aqui!</p>
            <button></button>
          </DivAssinatura>
        </>
      ) : (
        <>
          <BarraFalha>Ops... algo deu errado</BarraFalha>
          <DivAssinatura>
            <p>
              <br />
              Não foi possível completar a assinatura. Revise seus métodos de
              pagamento.
            </p>
            <BotaoIrAssinatura to="/user/perfil">
              {' '}
              Ir para pagamento
            </BotaoIrAssinatura>
          </DivAssinatura>
        </>
      )}
    </Container>
  )
}

export default Assinatura
