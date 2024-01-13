import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BtnEnviar, NavLogin, SmallButton, StyledInput } from '../Login/styles'
import { cores } from '../../styles'
import { Container } from '@mui/material'
import axios from 'axios'

const CadastroForm = () => {
  const formik = useFormik({
    initialValues: {
      Nome: '',
      Email: '',
      Data_nascimento: '',
      Telefone: '',
      Senha: '',
      ConfirmacaoSenha: ''
    },
    validationSchema: Yup.object({
      Nome: Yup.string().required('Campo obrigatório'),
      Email: Yup.string()
        .email('E-mail inválido')
        .required('Campo obrigatório'),
      Data_nascimento: Yup.date().required('Campo obrigatório'),
      Telefone: Yup.string().required('Campo obrigatório'),
      Senha: Yup.string().required('Campo obrigatório'),
      ConfirmacaoSenha: Yup.string()
        .oneOf([Yup.ref('Senha')], 'As senhas não coincidem')
        .required('Campo obrigatório')
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          'http://localhost:3001/insert',
          values
        )
        console.log(response.data)
      } catch (error) {
        console.error('Houve um erro ao enviar os dados do formulário', error)
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
          <label htmlFor="Nome">Nome:</label>
          <StyledInput
            type="text"
            id="Nome"
            name="Nome"
            value={formik.values.Nome}
            onChange={formik.handleChange}
          />
          {formik.touched.Nome && formik.errors.Nome && (
            <p style={{ color: 'red' }}>{formik.errors.Nome}</p>
          )}
        </div>
        <div>
          <label htmlFor="Email">E-mail:</label>
          <StyledInput
            type="email"
            id="Email"
            name="Email"
            value={formik.values.Email}
            onChange={formik.handleChange}
          />
          {formik.touched.Email && formik.errors.Email && (
            <p style={{ color: 'red' }}>{formik.errors.Email}</p>
          )}
        </div>
        <div>
          <label htmlFor="Data_nascimento">Data de Nascimento:</label>
          <StyledInput
            type="date"
            id="Data_nascimento"
            name="Data_nascimento"
            value={formik.values.Data_nascimento}
            onChange={formik.handleChange}
          />
          {formik.touched.Data_nascimento && formik.errors.Data_nascimento && (
            <p style={{ color: 'red' }}>{formik.errors.Data_nascimento}</p>
          )}
        </div>
        <div>
          <label htmlFor="Telefone">Telefone:</label>
          <StyledInput
            type="tel"
            id="Telefone"
            name="Telefone"
            value={formik.values.Telefone}
            onChange={formik.handleChange}
          />
          {formik.touched.Telefone && formik.errors.Telefone && (
            <p style={{ color: 'red' }}>{formik.errors.Telefone}</p>
          )}
        </div>
        <div>
          <label htmlFor="Senha">Senha:</label>
          <StyledInput
            type="password"
            id="Senha"
            name="Senha"
            value={formik.values.Senha}
            onChange={formik.handleChange}
          />
          {formik.touched.Senha && formik.errors.Senha && (
            <p style={{ color: 'red' }}>{formik.errors.Senha}</p>
          )}
        </div>
        <div>
          <label htmlFor="ConfirmacaoSenha">Confirmação de Senha:</label>
          <StyledInput
            type="password"
            id="ConfirmacaoSenha"
            name="ConfirmacaoSenha"
            value={formik.values.ConfirmacaoSenha}
            onChange={formik.handleChange}
          />
          {formik.touched.ConfirmacaoSenha &&
            formik.errors.ConfirmacaoSenha && (
              <p style={{ color: 'red' }}>{formik.errors.ConfirmacaoSenha}</p>
            )}
        </div>
        <BtnEnviar type="submit">Cadastrar</BtnEnviar>
      </form>
    </Container>
  )
}

export default CadastroForm
