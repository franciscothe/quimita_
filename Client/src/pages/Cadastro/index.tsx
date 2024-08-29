import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BtnEnviar, NavLogin, SmallButton, StyledInput } from '../Login/styles'
import { cores } from '../../styles'
import { Container } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IMaskInput } from 'react-imask' // Importa o IMaskInput

const CadastroForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      confirmaSenha: '',
      telefone: '' // Adiciona o campo telefone
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .required('Campo obrigatório')
        .matches(
          /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/,
          'O nome completo deve conter pelo menos duas palavras.'
        ),
      email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      senha: Yup.string().required('Campo obrigatório'),
      confirmaSenha: Yup.string()
        .oneOf([Yup.ref('senha')], 'As senhas não coincidem')
        .required('Campo obrigatório'),
      telefone: Yup.string()
        .required('Campo obrigatório')
        .matches(
          /^\(\d{2}\) \d \d{4}-\d{4}$/,
          'Formato inválido. Ex: (99) 9 9999-9999'
        ) // Validação do telefone
    }),
    onSubmit: async (values) => {
      try {
        // const response = await axios.post('/auth/register', values)
        const response = await axios.post(
          // 'https://localhost:5002/auth/register',
          '/auth/register',
          values
        )
        const token = response.data.token
        localStorage.setItem('token', token)
        console.log('Usuário cadastrado com sucesso:', response.data)
        navigate('/user/perfil')
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 409
        ) {
          alert('Este e-mail já está em uso. Por favor, escolha outro.')
        } else {
          alert('Ocorreu um erro. Tente novamente mais tarde.')
        }
      }
    }
  })

  return (
    <Container>
      <NavLogin>
        <SmallButton to="/Sumario" color={cores.laranjaClaro}>
          LIÇÕES
        </SmallButton>
      </NavLogin>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="nome">Nome Completo:</label>
          <StyledInput
            type="text"
            id="nome"
            name="nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
          />
          {formik.touched.nome && formik.errors.nome && (
            <p style={{ color: 'red' }}>{formik.errors.nome}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <StyledInput
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p style={{ color: 'red' }}>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <StyledInput
            type="password"
            id="senha"
            name="senha"
            value={formik.values.senha}
            onChange={formik.handleChange}
          />
          {formik.touched.senha && formik.errors.senha && (
            <p style={{ color: 'red' }}>{formik.errors.senha}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmaSenha">Confirmação de Senha:</label>
          <StyledInput
            type="password"
            id="confirmaSenha"
            name="confirmaSenha"
            value={formik.values.confirmaSenha}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmaSenha && formik.errors.confirmaSenha && (
            <p style={{ color: 'red' }}>{formik.errors.confirmaSenha}</p>
          )}
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <IMaskInput
            mask="(00) 0 0000-0000"
            className="form-control"
            type="text"
            id="telefone"
            name="telefone"
            value={formik.values.telefone}
            onChange={formik.handleChange}
            placeholder="(__) _ ____-____"
          />
          {formik.touched.telefone && formik.errors.telefone && (
            <p style={{ color: 'red' }}>{formik.errors.telefone}</p>
          )}
        </div>
        <BtnEnviar type="submit">Cadastrar</BtnEnviar>
      </form>
    </Container>
  )
}

export default CadastroForm
