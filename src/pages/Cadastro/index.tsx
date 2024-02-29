import React, { useState } from 'react' // Adicione o import de useState aqui

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BtnEnviar, NavLogin, SmallButton, StyledInput } from '../Login/styles'
import { cores } from '../../styles'
import { Container } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CadastroForm = () => {
  const navigate = useNavigate() // Cria a instância de useNavigate

  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      confirmaSenha: ''
    },
    validationSchema: Yup.object({
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
        const response = await axios.post(
          'http://18.229.49.51:80/auth/register',
          values
        )
        console.log('Usuário cadastrado com sucesso:', response.data)
        navigate('/user/perfil') // Redireciona para /user/perfil após sucesso

        // Redirecionar para página de sucesso, fazer login automático, etc.
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)
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
            type="nome"
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
