import React, { useState } from 'react'
import axios from 'axios'

const CardForm = ({ userToken }) => {
  const [cardData, setCardData] = useState({
    number: '',
    holder_name: '',
    exp_month: '',
    exp_year: '',
    cvv: '',
    label: ''
  })

  const handleChange = (e) => {
    //e é evento, click por exemplo
    const { name, value } = e.target //extrai as propriedades de nome e valor do elemento que foi alterado
    setCardData({
      ...cardData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() //
    try {
      // eslint-disable-next-line no-undef
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
      const options = {
        method: 'POST',
        url: 'https://api.pagar.me/core/v5/tokens?appId=pk_test_Y87bOMKHMfAVyqQe',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
        data: {
          type: 'card',
          card: {
            number: cardData.number,
            holder_name: cardData.holder_name,
            exp_month: parseInt(cardData.exp_month),
            exp_year: parseInt(cardData.exp_year),
            cvv: cardData.cvv,
            label: cardData.label
          }
        }
      }
      const response = await axios.request(options)
      console.log('Token criado:', response.data)
      const tokenCard = response.data // Supondo que o token_card esteja no objeto response.data.id

      // Aqui você pode lidar com o token criado, como armazená-lo no estado do componente ou enviá-lo para o backend
      const backendResponse = await axios.post(
        'http://localhost:5002/criar-assinatura',
        {
          tokenCard: tokenCard,
          userToken: userToken // Envie também o token de usuário para o backend
        }
      )

      console.log('Resposta do backend:', backendResponse.data)
      // Faça algo com a resposta do backend, se necessário
    } catch (error) {
      console.error('Erro ao criar token:', error)
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
            placeholder="Mês de Expiração"
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
