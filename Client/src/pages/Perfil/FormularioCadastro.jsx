// FormularioCadastro.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import $ from 'jquery'
import 'jquery-mask-plugin/dist/jquery.mask.min.js'
import { BarraSucesso } from '../Assinatura/styles'
import { EnderecooDiv } from './styles'
import { IMaskInput } from 'react-imask';

const FormularioCadastro = ({ userInfo }) => {
  const [formValues, setFormValues] = useState({
    cpf: '',
    telefone: '',
    endereco: '',
    complemento: '',
    cep: '',
    cidade: '',
    estado: ''
  })

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const salvarInformacoes = async (token) => {
    try {
      await axios.post('/user/perfil/adicionar-informacoes', formValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Informações adicionais salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar informações adicionais:', error)
    }
  }

  const enviarParaPagarme = async (token) => {
    try {
      await axios.post(
        '/para-pagarme',
        {}, // Corpo da solicitação vazio, pois você já tem os dados do usuário no servidor
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log('Dados enviados para a Pagarme com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar dados para Pagarme:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.replace('/login')
        return
      }

      await salvarInformacoes(token)
      await enviarParaPagarme(token)

      setShowSuccessMessage(true)
      setShowForm(false)
    } catch (error) {
      console.error('Erro ao realizar operações:', error)
    }
  }

  const handleEditClick = () => {
    setShowForm(true) // Exibe o formulário quando o botão de editar é clicado
    setShowSuccessMessage(false) // Esconde a mensagem de sucesso
  }

  return (
    <div>
      <Container>
        {showSuccessMessage && (
          <div>
            <BarraSucesso>Dados salvos com sucesso!</BarraSucesso>
            <button onClick={handleEditClick} className="btn btn-primary">
              Editar dados
            </button>
          </div>
        )}

        {showForm && (
          <EnderecooDiv>
            <form onSubmit={handleSubmit}>
              <IMaskInput
                mask="000.000.000-00"
                className="form-control"
                type="text"
                id="cpf"
                name="cpf"
                value={formValues.cpf}
                onChange={handleInputChange}
                required
                placeholder="CPF"
              />
              <IMaskInput
                mask="(00) 0 0000-0000"
                className="form-control"
                type="text"
                id="telefone"
                name="telefone"
                value={formValues.telefone}
                onChange={handleInputChange}
                required
                placeholder="Telefone"
              />
              <input
                className="form-control"
                type="text"
                id="endereco"
                name="endereco"
                value={formValues.endereco}
                onChange={handleInputChange}
                required
                placeholder="Rua/Avenida"
              />
              <input
                className="form-control"
                type="text"
                id="complemento"
                name="complemento"
                value={formValues.complemento}
                onChange={handleInputChange}
                required
                placeholder="Número ou Quadra e lote"
              />
              <IMaskInput
                mask="00000-000"
                className="form-control"
                type="text"
                id="cep"
                name="cep"
                value={formValues.cep}
                onChange={handleInputChange}
                required
                placeholder="CEP"
              />
              <input
                className="form-control"
                type="text"
                id="estado"
                name="estado"
                value={formValues.estado}
                onChange={handleInputChange}
                required
                placeholder="Estado"
              />
              <input
                className="form-control"
                type="text"
                id="cidade"
                name="cidade"
                value={formValues.cidade}
                onChange={handleInputChange}
                required
                placeholder="Cidade"
              />
              <button type="submit" className="btn btn-primary">
                Salvar Informações
              </button>
            </form>
          </EnderecooDiv>
        )}
      </Container>
    </div>
  )
}

export default FormularioCadastro
