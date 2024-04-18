import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Importe useNavigate
const CardForm = ({ userToken }) => {
  const [cardData, setCardData] = useState({
    number: '',
    holder_name: '',
    exp_month: '',
    exp_year: '',
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
    try {
      // 1. Enviar os dados do cartão e receber o card_id

      const cardResponse = await axios.post(
        'https://api.pagar.me/core/v5/tokens?appId=pk_test_Y87bOMKHMfAVyqQe',
        {
          type: 'card',
          card: {
            number: cardData.number,
            holder_name: cardData.holder_name,
            exp_month: parseInt(cardData.exp_month),
            exp_year: parseInt(cardData.exp_year),
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

      // 2. Obter os dados do usuário do banco de dados

      // 3. Preencher o payload com os dados do usuário e o card_id
      // // const payload = {
      // //   customer: {
      // //     name: userData.nome,
      // //     type: 'individual',
      // //     email: userData.email,
      // //     document: userData.cpf
      // //   },
      // //   plan_id: 'plan_yKmZzVBUvUEzAGX7',
      // //   billing_address: {
      // //     line_1: userData.endereco,
      // //     line_2: userData.complemento,
      // //     zip_code: userData.cep,
      // //     city: userData.cidade,
      // //     state: userData.estado,
      // //     country: 'BR'
      // //   },
      // //   payment_method: 'credit_card',
      // //   card_token: cardId,
      // //   metadata: {
      // //     id: userData._id
      // //   }
      // // }

      // // // 4. Enviar a assinatura
      // // const subscriptionResponse = await axios.post(
      // //   'https://api.pagar.me/core/v5/subscriptions',
      // //   payload
      // )
      navigate('/user/perfil/assinatura')
      // console.log('Assinatura criada:', subscriptionResponse.data)
    } catch (error) {
      navigate('/user/perfil/assinatura')
      // console.error('Erro ao criar assinatura:', error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      data-pagarmecheckout-form
      className="form-group"
    >
      <input
        type="text"
        name="number"
        value={cardData.number}
        onChange={handleChange}
        placeholder="Número do Cartão"
        className="form-control"
      />
      <input
        type="text"
        name="holder_name"
        value={cardData.holder_name}
        onChange={handleChange}
        placeholder="Nome do Titular"
        className="form-control"
        data-pagarmecheckout-element="holder_name"
      />
      <div className="row">
        <div className="col-md-3">
          <input
            type="text"
            name="exp_month"
            value={cardData.exp_month}
            onChange={handleChange}
            placeholder="Mês de Expiração"
            className="form-control"
            data-pagarmecheckout-element="number"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="exp_year"
            value={cardData.exp_year}
            onChange={handleChange}
            placeholder="Ano de Expiração"
            className="form-control"
            data-pagarmecheckout-element="number"
          />
        </div>
      </div>
      <span data-pagarmecheckout-element="brand"></span>
      <input
        type="text"
        name="cvv"
        data-pagarmecheckout-element="cvv"
        value={cardData.cvv}
        onChange={handleChange}
        placeholder="CVV"
        className="form-control"
      />

      <button type="submit">Enviar</button>
    </form>
  )
}

export default CardForm
