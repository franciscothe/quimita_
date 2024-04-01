import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PdfViewer from '../../../components/ExibirApostila'
import { Video } from '../../../components/Video'
import { Header } from '../../../components/Header'
import BotaoGrupos from '../../../components/BotaoGrupos'
import { BotaoIrSumario } from '../../../components/Botao/styles'

export const L1: React.FC = () => {
  const [tokenPresente, setTokenPresente] = useState(false) // Estado para controlar se o token está presente
  const [mensagem, setMensagem] = useState('') // Estado para armazenar a mensagem

  useEffect(() => {
    const verificarToken = () => {
      const token = localStorage.getItem('token')
      if (token) {
        // Se o token estiver presente, definir tokenPresente como verdadeiro
        setTokenPresente(true)
      } else {
        // Se o token não estiver presente, definir tokenPresente como falso e definir a mensagem
        setTokenPresente(false)
        setMensagem('Faça a assinatura para visualizar a apostila da lição')
      }
    }

    verificarToken()
  }, [])

  const customContent = () => (
    <BotaoIrSumario to="/Sumario">Lições</BotaoIrSumario>
  )

  return (
    <div className="container">
      <Header customContent={customContent} />
      <div>
        <Video />
        {tokenPresente ? (
          <PdfViewer /> // Renderizar PdfViewer se o token estiver presente
        ) : (
          <p>{mensagem}</p> // Exibir mensagem se o token não estiver presente
        )}
        <BotaoGrupos />
      </div>
    </div>
  )
}

export default L1
