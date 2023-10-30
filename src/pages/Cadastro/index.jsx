import { Container } from '@mui/material'
import React, { useState } from 'react'
import { BtnEnviar, StyledInput } from '../Login/styles'

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    senha: '',
    confirmacaoSenha: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para lidar com os dados do formulário
    console.log('Dados do formulário:', formData)
    // Por exemplo, pode enviar os dados para a API, etc.
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <StyledInput
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <StyledInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <StyledInput
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <StyledInput
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <StyledInput
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmacaoSenha">Confirmação de Senha:</label>
          <StyledInput
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={formData.confirmacaoSenha}
            onChange={handleChange}
          />
        </div>
        <BtnEnviar type="submit">Cadastrar</BtnEnviar>
      </form>
    </Container>
  )
}

export default CadastroForm
