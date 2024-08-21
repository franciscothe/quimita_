import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Cabecalho, HeaderSumario } from '../../components/Header/styles'
import { Header } from '../../components/Header'
import { SmallButton } from '../Login/styles'
import FormPerfil from '../../components/Formulario_perfil'
import { ButtonToolbar, Container } from 'react-bootstrap'
import {
  BotaoPerfil,
  BtnCancelaAssinatura,
  HeaderPerfil,
  InfoUser
} from './styles'
import { Button } from '../../components/Enunciado/styles'
import FormularioCadastro from './FormularioCadastro'
import { FormularioPgto } from '../../components/Formulario_perfil/styles'
import CardForm from './Pagamento'
import { BotaoIrSumario } from '../../components/Botao/styles'
import NavBarUsuario from '../../components/BarraNavegacao'
import styled from 'styled-components'
import CupomDesconto from '../../components/CupomDesconto'
import imagemTutorial from '../Perfil/Formularios/Ativo 1.jpg'
import Cupom6meses from './CupomDesconto'

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          // Se o token não estiver presente, redirecionar o usuário para a página de login
          window.location.replace('/')
          return
        }

        // Fazer uma requisição para o backend para obter as informações do usuário
        // const response = await axios.get('https://localhost:5002/user/perfil', {
        const response = await axios.get('/user/perfil', {
          headers: {
            Authorization: `Bearer ${token}` // Enviar o token armazenado no localStorage no cabeçalho da requisição
          }
        })

        setUserInfo(response.data)
        console.log(response.data)
      } catch (error) {
        // Se houver erro ao obter as informações do usuário, tratar o erro aqui
        console.error('Erro ao obter as informações do usuário:', error)
      }
    }

    fetchUserProfile()
  }, [])

  return (
    <div>
      <NavBarUsuario />
      <Container>
        <HeaderPerfil>
          <h2>Informações do Usuário</h2>
        </HeaderPerfil>
        {userInfo ? (
          <div>
            <p>Nome: {userInfo.nome}</p>
            <p>Email: {userInfo.email}</p>
          </div>
        ) : (
          <>
            <p>Carregando informações do perfil...</p>
          </>
        )}

        {/* Renderização condicional dos componentes com base na assinatura */}
        {userInfo && userInfo.assinatura === 'true' ? (
          <InfoUser>
            <p style={{ color: 'green', fontWeight: 'bold' }}>
              A assinatura está ativa.
            </p>

            <BotaoIrSumario to="/Sumario">
              Acessar lista de lições
            </BotaoIrSumario>
            <img src={imagemTutorial} style={{ marginBottom: '60px' }} />
            <BtnCancelaAssinatura to="https://api.whatsapp.com/send/?phone=5562985456601&text=Gostaria+de+cancelar+minha+assinatura+quimITA.&type=phone_number&app_absent=0">
              {' '}
              Cancelar Assinatura
            </BtnCancelaAssinatura>
          </InfoUser>
        ) : (
          <>
            {/* Renderizar o componente FormularioCadastro apenas se o campo cpf não estiver preenchido */}
            {!userInfo?.cpf && (
              <>
                <FormularioCadastro userToken={localStorage.getItem('token')} />
                {/* <Cupom6meses userToken={localStorage.getItem('token')}>
                  {' '}
                </Cupom6meses> */}
              </>
            )}
            {/* Renderizar o componente CardForm apenas se o campo cpf estiver preenchido */}
            {userInfo?.cpf && (
              <>
                <CardForm userToken={localStorage.getItem('token')} />
              </>
            )}
          </>
        )}
      </Container>
    </div>
  )
}

export default Perfil
