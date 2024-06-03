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
            <p>O usuário possui uma assinatura ativa.</p>
            <BotaoIrSumario to="/Sumario">
              Acessar lista de lições
            </BotaoIrSumario>
            <BtnCancelaAssinatura> Cancelar Assinatura</BtnCancelaAssinatura>
          </InfoUser>
        ) : (
          <>
            {/* Renderizar os componentes FormularioCadastro e CardForm apenas se a assinatura for diferente de "true" */}
            <FormularioCadastro userToken={localStorage.getItem('token')} />
            <CardForm userToken={localStorage.getItem('token')} />
          </>
        )}
      </Container>
    </div>
  )
}

export default Perfil
