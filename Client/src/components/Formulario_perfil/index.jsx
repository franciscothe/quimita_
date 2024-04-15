import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'jquery-mask-plugin/dist/jquery.mask.min.js' // Importe a biblioteca jQuery Mask

function Formulario_Perfil() {
  useEffect(() => {
    // Aplica máscaras nos campos de input
    $('#numeroCartao')
      .mask('0000 0000 0000 0000')
      .attr('placeholder', 'Número do cartão')
    $('#nomePortador').attr('placeholder', 'Nome do titular')
    $('#mesExpiracao').mask('00/00').attr('placeholder', 'MM/AA')
    $('#cpf').mask('000.000.000-00').attr('placeholder', 'CPF')

    $('#cvv').mask('000').attr('placeholder', 'CVV')
  }, [])

  const [formData, setFormData] = useState({
    customer: {
      name: 'Victor Hugo',
      type: 'individual',
      email: 'victorhguimaraes.vh@gmail.com',
      document: '70292616155',
      address: {
        line_1: 'Rua caragoata',
        line_2: 'qd 10',
        zip_code: '74840-240',
        city: 'Goiania',
        state: 'Goias',
        country: 'BR'
      },
      phones: {
        home_phone: {
          country_code: '55',
          area_code: '62',
          number: '985456601'
        },
        mobile_phone: {
          country_code: '55',
          area_code: '62',
          number: '985456601'
        }
      }
    },
    plan_id: '',
    payment_method: 'credit_card',
    card_token: '{{card_token}}',
    credit_card: {
      installments: 1,
      statement_descriptor: 'Assinatura do plano',
      card: {
        billing_address: {
          line_1: '',
          zip_code: '',
          city: '',
          state: '',
          country: 'BR'
        }
      }
    },
    metadata: {
      id: 'my_subscription_id'
    }
  })
  const handleChange = ({ target: { name, value } }) => {
    const keys = name.split('.')
    setFormData((formData) => {
      let data = { ...formData }
      keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
          acc[key] = value
        } else {
          acc[key] = acc[key] || {}
        }
        return acc[key]
      }, data)
      return data
    })
  }

  const createCardToken = async () => {
    const cardData = {
      card_number: formData.card.card_number,
      card_holder_name: formData.card.card_holder_name,
      card_expiration_date: formData.card.card_expiration_date,
      card_cvv: formData.card.card_cvv
    }

    try {
      const response = await fetch(
        `https://api.pagar.me/core/v5/tokens?appId=pk_test_Y87bOMKHMfAVyqQe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cardData)
        }
      )

      const data = await response.json()
      if (data.id) {
        setFormData((prevState) => ({ ...prevState, cardToken: data.id }))
        return data.id
      } else {
        // Tratar erro
        console.error('Erro ao criar token do cartão')
      }
    } catch (error) {
      console.error('Erro ao criar token do cartão:', error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const cardToken = await createCardToken()
    if (!cardToken) {
      console.error('Falha ao obter token do cartão')
      return
    }

    // Aqui você adiciona os dados da assinatura, incluindo o token do cartão
    const subscriptionData = {
      // Dados da assinatura
      card_id: cardToken // Use o token do cartão aqui
      // Adicione outros dados necessários para a assinatura
    }

    try {
      const response = await fetch(
        'https://api.pagar.me/core/v5/subscriptions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // Adicione outros headers necessários, como autenticação
          },
          body: JSON.stringify(subscriptionData)
        }
      )

      const data = await response.json()
      console.log('Assinatura criada:', data)
      // Trate a resposta da criação da assinatura aqui
    } catch (error) {
      console.error('Erro ao criar assinatura:', error)
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        {/* Dados do Cliente */}
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="customer.name"
            value={formData.customer.name}
            onChange={handleChange}
            className="form-control"
          />
          <label>Email</label>
          <input
            type="email"
            name="customer.email"
            value={formData.customer.email}
            onChange={handleChange}
            className="form-control"
          />
          <label>CPF </label>
          <input
            type="text"
            name="customer.document"
            value={formData.customer.document}
            onChange={handleChange}
            className="form-control"
          />
          <label>Endereço</label>
          <input
            type="text"
            name="customer.address.line_1"
            value={formData.customer.address.line_1}
            onChange={handleChange}
            className="form-control"
            placeholder="Endereço Linha 1"
            required
          />
          <input
            type="text"
            name="customer.address.line_2"
            value={formData.customer.address.line_2}
            onChange={handleChange}
            className="form-control"
            placeholder="Complemento"
            required
          />
          <input
            type="text"
            name="customer.address.zip_code"
            value={formData.customer.address.zip_code}
            onChange={handleChange}
            className="form-control"
            placeholder="CEP"
            required
          />
          <input
            type="text"
            name="customer.address.city"
            value={formData.customer.address.city}
            onChange={handleChange}
            className="form-control"
            placeholder="Cidade"
            required
          />
          <input
            type="text"
            name="customer.address.state"
            value={formData.customer.address.state}
            onChange={handleChange}
            className="form-control"
            placeholder="Estado"
            required
          />
          {/* Campos de telefone */}
          <input
            type="text"
            name="customer.phones.mobile_phone.number"
            value={formData.customer.phones.mobile_phone.number}
            onChange={handleChange}
            className="form-control"
            placeholder="Número de celular"
            required
          />
          <label>Pagamento</label>
          <div className="form-group">
            <input
              type="text"
              name="credit_card.card.card_number"
              value={''}
              onChange={handleChange}
              className="form-control"
              placeholder="Número do Cartão"
              required
              id="numeroCartao"
              data-pagarmecheckout-element="number"
            />
            <span data-pagarmecheckout-element="brand"></span>

            <input
              type="text"
              name="credit_card.card.card_holder_name"
              value={'Eleusa Maria Mendes'}
              onChange={handleChange}
              className="form-control"
              placeholder="Nome no Cartão"
              data-pagarmecheckout-element="holder_name"
              required
            />
            <input
              type="text"
              name="credit_card.card.card_expiration_date"
              value={'04/30'}
              onChange={handleChange}
              className="form-control"
              placeholder="MM/YY"
              required
              id="mesExpiracao"
              data-pagarmecheckout-element="exp_date"
            />
            <input
              type="text"
              name="credit_card.card.card_cvv"
              value={'878'}
              onChange={handleChange}
              className="form-control"
              placeholder="CVV"
              required
              id="cvv"
              data-pagarmecheckout-element="cvv"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Assinar Plano
        </button>
      </form>
    </div>
  )
}

export default Formulario_Perfil
