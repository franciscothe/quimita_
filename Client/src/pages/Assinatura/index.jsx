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

    fetch('/user/verifica-assinatura', {
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
        console.error('Erro ao verificar status da assinatura:', error)
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
            <ul>
              <li>Acesso liberado às apostilas!</li>
              <li>
                Acesso liberado à coletânea de exercícios organizados por nível
                de dificuldade!
              </li>
              <li>Acesso liberado às resoluções de exercícios passo-a-passo</li>
            </ul>
            <BotaoIrAssinatura to="/Sumario">
              {' '}
              Ir para lista de lições
            </BotaoIrAssinatura>
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
