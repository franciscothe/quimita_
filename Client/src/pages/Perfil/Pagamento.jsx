import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Importe useNavigate
import { Buffer } from 'buffer'

import { PagamentoDiv } from './styles'
import { IMaskInput } from 'react-imask'

const CardForm = ({ userToken }) => {
  const [cardData, setCardData] = useState({
    number: '',
    holder_name: '',
    exp_date: '',
    cvv: '',
    label: ''
  })

  const [userData, setUserData] = useState(null)
  const navigate = useNavigate() // Inicialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://localhost:5002/user/perfil', {
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
    const cpfSemEspacos = cardData.number.replace(/\D/g, '')

    try {
      // 1. Enviar os dados do cartão e receber o card_id

      const cardResponse = await axios.post(
        'https://api.pagar.me/core/v5/tokens?appId=pk_test_Y87bOMKHMfAVyqQe',
        {
          type: 'card',
          card: {
            number: cpfSemEspacos,
            holder_name: cardData.holder_name,
            exp_month: cardData.exp_date.substring(0, 2),
            exp_year: cardData.exp_date.substring(3, 5),
            cvv: cardData.cvv
          },
          billing_address: {
            line_1: userData.endereco,
            line_2: userData.complemento,
            zip_code: userData.cep,
            city: userData.cidade,
            state: userData.estado,
            country: 'BR'
          }
        }
      )

      const cardId = cardResponse.data.id
      console.log('Card ID:', cardId)

      await axios.post(
        'https://localhost:5002/assinatura',
        {
          cardId
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      navigate('/user/perfil/assinatura')

      // 2. Obter os dados do usuário do banco de dados
      // 3. Preencher o payload com os dados do usuário e o card_id
      const payload = {
        customer: {
          name: userData.nome,
          type: 'individual',
          email: userData.email,
          document: userData.cpf
        },
        plan_id: 'plan_yKmZzVBUvUEzAGX7',
        billing_address: {
          line_1: userData.endereco,
          line_2: userData.complemento,
          zip_code: userData.cep,
          city: userData.cidade,
          state: userData.estado,
          country: 'BR'
        },
        payment_method: 'credit_card',
        card_token: cardId,
        metadata: {
          id: userData._id
        }
      }
      console.log(payload)

      // 4. Enviar a assinatura
    } catch (error) {
      // Trate os erros da requisição aqui
      console.error('Erro ao criar assinatura:', error)
    }
  }

  return (
    <PagamentoDiv>
      <h5>
        Valor da assinatura: <b> R$18,00 </b>
      </h5>
      <ul>
        <li>Acesso as lições</li>
      </ul>
      <form
        onSubmit={handleSubmit}
        data-pagarmecheckout-form
        className="form-group"
      >
        <label> Número do cartão</label>
        <IMaskInput
          mask="0000  0000  0000 0000"
          type="text"
          name="number"
          value={cardData.number}
          onChange={handleChange}
          placeholder="_ _ _ _   _ _ _ _   _ _ _ _   _ _ _ _"
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
          data-pagarmecheckout-element="holder_name"
          required
        />
        <label>Validade do cartão: MM/AA</label>
        <IMaskInput
          mask="00/00"
          type="text"
          name="exp_date"
          value={cardData.exp_date}
          onChange={handleChange}
          placeholder=" _ _/_ _"
          className="form-control"
          data-pagarmecheckout-element="number"
          required
        />

        <span data-pagarmecheckout-element="brand"></span>
        <label>Código de segurança (CVV) </label>
        <input
          type="text"
          name="cvv"
          data-pagarmecheckout-element="cvv"
          value={cardData.cvv}
          onChange={handleChange}
          placeholder="_ _ _"
          className="form-control"
          required
        />
        <button type="submit">Realizar Pagamento</button>
      </form>
    </PagamentoDiv>
  )
}

export default CardForm
