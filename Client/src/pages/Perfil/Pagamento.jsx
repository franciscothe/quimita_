import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { PagamentoDiv } from './styles'
import { IMaskInput } from 'react-imask'
import { Container } from '@mui/material'
import Cupom6meses from './CupomDesconto'

const CardForm = ({ userToken }) => {
  const [cardData, setCardData] = useState({
    number: '',
    holder_name: '',
    exp_date: '',
    cvv: ''
  })

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get('https://localhost:5002/user/perfil', {
        const response = await axios.get('/user/perfil', {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        })
        setUserData(response.data)
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error)
      }
    }
    fetchUserData()
  }, [userToken])

  const handleChange = (e) => {
    const { name, value } = e.target
    setCardData({
      ...cardData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return // Evita múltiplos cliques

    const cpfSemEspacos = cardData.number.replace(/\D/g, '')

    try {
      setLoading(true) // Ativa o estado de carregamento

      const cardResponse = await axios.post(
        'https://api.pagar.me/core/v5/tokens?appId=pk_1XMN4yCJYUMj2myk',
        {
          type: 'card',
          card: {
            number: cpfSemEspacos,
            holder_name: cardData.holder_name,
            exp_month: cardData.exp_date.substring(0, 2),
            exp_year: cardData.exp_date.substring(3, 5),
            cvv: cardData.cvv
          }
        }
      )

      const cardId = cardResponse.data.id

      console.log('Card ID:', cardId)

      await axios.post(
        // 'https://localhost:5002/assinatura',
        '/assinatura',
        {
          cardId
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${userToken}`
          }
        }
      )

      window.location.reload()
    } catch (error) {
      console.error('Erro ao realizar pagamento:', error)
      user.assinatura = true
      await user.save()
    } finally {
      setLoading(false) // Desativa o estado de carregamento
    }
  }

  return (
    <PagamentoDiv>
      <h3>
        Valor da assinatura: <b>R$ 20,00</b>
      </h3>
      <h5>Acesso às lições</h5>
      {/* <Cupom6meses userToken={localStorage.getItem('token')}> </Cupom6meses> */}

      <Container>
        <form onSubmit={handleSubmit} autoComplete="off" className="form-group">
          <label>Número do cartão</label>
          <IMaskInput
            mask="0000 0000 0000 0000"
            type="text"
            name="number"
            value={cardData.number}
            onChange={handleChange}
            placeholder="_ _ _ _ _ _ _ _ _ _ _ _ _ _ _"
            className="form-control"
            required
          />
          <label>Nome do titular</label>
          <input
            type="text"
            name="holder_name"
            value={cardData.holder_name}
            onChange={handleChange}
            placeholder=""
            className="form-control"
            required
          />
          <label>Validade do cartão: MM/AA</label>
          <IMaskInput
            mask="00/00"
            type="text"
            name="exp_date"
            value={cardData.exp_date}
            onChange={handleChange}
            placeholder="_ _ / _ _"
            className="form-control"
            required
          />
          <label>Código de segurança (CVV)</label>
          <input
            type="text"
            name="cvv"
            value={cardData.cvv}
            onChange={handleChange}
            placeholder="_ _ _"
            className="form-control"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Finalize sua compra'}
          </button>
        </form>
      </Container>
    </PagamentoDiv>
  )
}

export default CardForm
