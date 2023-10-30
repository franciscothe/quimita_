import React, { useState } from 'react'
import { BtnEnviar, NavLogin, SmallButton, StyledInput } from '../Login/styles'
import { cores } from '../../styles'
import { Container } from '@mui/material'

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    senha: '',
    confirmacaoSenha: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    // Lógica para manipular os dados do formulário, como enviar para uma API, etc.
  }

  return (
    <Container>
      <NavLogin>
        <SmallButton to="/Sumario" color={cores.laranjaClaro}>
          LIÇÕES
        </SmallButton>
      </NavLogin>
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
