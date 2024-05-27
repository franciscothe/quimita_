import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const CupomDescontoWrapper = styled.div`
  margin-top: 20px;
`

const CupomDesconto = ({ userToken }) => {
  const [cupom, setCupom] = useState('')
  const [message, setMessage] = useState('')

  const handleInputChange = (event) => {
    setCupom(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        'https://localhost:5002/user/apply-coupon',
        { cupom },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )

      if (response.data.success) {
        setMessage('Cupom aceito! Sua assinatura foi ativada.')
        // Atualizar o campo "assinatura" do usuário para "true"
        window.location.reload() // Recarregar a página para atualizar as informações do usuário
      } else {
        setMessage('Cupom inválido. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro ao aplicar o cupom:', error)
      setMessage('Erro ao aplicar o cupom. Tente novamente.')
    }
  }

  return (
    <CupomDescontoWrapper>
      <form onSubmit={handleSubmit}>
        <label>
          Código do Cupom:
          <input type="text" value={cupom} onChange={handleInputChange} />
        </label>
        <button type="submit">Aplicar Cupom</button>
      </form>
      {message && <p>{message}</p>}
    </CupomDescontoWrapper>
  )
}

export default CupomDesconto
