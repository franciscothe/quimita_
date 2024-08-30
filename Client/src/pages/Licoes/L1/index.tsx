import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PdfViewer from '../../../components/ExibirApostila'
import { Video } from '../../../components/Video'
import { Header } from '../../../components/Header'
import BotaoGrupos from '../../../components/BotaoGrupos'
import { Botao, BotaoIrSumario } from '../../../components/Botao/styles'
import { cores } from '../../../styles'
import { ExibirMensagem } from './styles'

export const L1: React.FC = () => {
  const [assinaturaValida, setAssinaturaValida] = useState(false) // Estado para armazenar o status da assinatura e token
  const [mensagem, setMensagem] = useState('') // Estado para armazenar a mensagem

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          // Chama a API para verificar o status da assinatura
          const response = await axios.post(
            // 'https://localhost:5002/user/verifica-assinatura',
            '/user/verifica-assinatura',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          console.log('Resposta da API:', response.data) // Log da resposta da API

          // Verifica o campo 'assinatura' na resposta
          if (response.data.assinatura === 'true') {
            setAssinaturaValida(true)
            console.log('A assinatura é válida.') // Log de assinatura válida
          } else {
            setAssinaturaValida(false)
            setMensagem(
              'Faça a assinatura para visualizar a apostila e os exercícios da lição'
            )
            console.log('A assinatura não é válida.') // Log de assinatura inválida
          }
        } catch (error) {
          console.error('Erro ao verificar a assinatura:', error)
          setAssinaturaValida(false)
          setMensagem(
            'Faça seu cadastro para ter acesso à apostila e grupos de exercícios'
          )
        }
      } else {
        setAssinaturaValida(false)
        setMensagem(
          'Faça o seu cadastro para ter acesso à apostila e grupos de exercícios'
        )
      }
    }

    verificarToken()
  }, [])

  useEffect(() => {
    console.log(`O estado de assinaturaValida mudou para: ${assinaturaValida}`) // Log de mudança de estado
  }, [assinaturaValida])

  const customContent = () => (
    <>
      <BotaoIrSumario to="/Sumario">Lições</BotaoIrSumario>
    </>
  )

  return (
    <div className="container">
      <Header customContent={customContent} />
      <div>
        <Video />
        {assinaturaValida ? (
          <>
            <PdfViewer />
            <BotaoGrupos />
          </>
        ) : (
          <ExibirMensagem>
            <p>{mensagem}</p>
            <Botao to="/login" color={cores.laranja}>
              ACESSAR
            </Botao>
          </ExibirMensagem>
        )}
      </div>
    </div>
  )
}

export default L1
