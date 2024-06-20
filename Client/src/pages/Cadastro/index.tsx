import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BtnEnviar, NavLogin, SmallButton, StyledInput } from '../Login/styles'
import { cores } from '../../styles'
import { Container } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CadastroForm = () => {
  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      confirmaSenha: ''
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Campo obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      senha: Yup.string().required('Campo obrigatório'),
      confirmaSenha: Yup.string()
        .oneOf([Yup.ref('senha')], 'As senhas não coincidem')
        .required('Campo obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/auth/register', values)
        const token = response.data.token
        localStorage.setItem('token', token)
        console.log('Usuário cadastrado com sucesso:', response.data)
        navigate('/user/perfil')
      } catch (error: any) {
        console.error('Erro ao cadastrar usuário:', error)
        if (error.response && error.response.status === 409) {
          alert('Este e-mail já está em uso. Por favor, escolha outro.')
        } else {
          alert('Ocorreu um erro. Por favor, tente novamente.')
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
          <label htmlFor="nome">Nome:</label>
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
        <BtnEnviar type="submit">Cadastrar</BtnEnviar>
      </form>
    </Container>
  )
}

export default CadastroForm
