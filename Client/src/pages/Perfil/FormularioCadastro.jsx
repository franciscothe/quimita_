// FormularioCadastro.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import $ from 'jquery'
import 'jquery-mask-plugin/dist/jquery.mask.min.js'
import { BarraSucesso } from '../Assinatura/styles'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.replace('/login')
        return
      }

      await axios.post('/user/perfil/adicionar-informacoes', formValues, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setShowSuccessMessage(true)
      setShowForm(false) // Oculta o formulário após sucesso

      console.log('Informações adicionais salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar informações adicionais:', error)
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
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="text"
              id="cpf"
              name="cpf"
              value={formValues.cpf}
              onChange={handleInputChange}
              required
              placeholder="CPF"
            />
            <input
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
              placeholder="Endereço"
            />
            <input
              className="form-control"
              type="text"
              id="complemento"
              name="complemento"
              value={formValues.complemento}
              onChange={handleInputChange}
              required
              placeholder="Complemento"
            />
            <input
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
        )}
      </Container>
    </div>
  )
}

export default FormularioCadastro
