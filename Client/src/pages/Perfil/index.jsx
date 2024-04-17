import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Cabecalho, HeaderSumario } from '../../components/Header/styles'
import { Header } from '../../components/Header'
import { SmallButton } from '../Login/styles'
import FormPerfil from '../../components/Formulario_perfil'
import { ButtonToolbar, Container } from 'react-bootstrap'
import { BotaoPerfil, HeaderPerfil } from './styles'
import { Button } from '../../components/Enunciado/styles'
import FormularioCadastro from './FormularioCadastro'
import { FormularioPgto } from '../../components/Formulario_perfil/styles'
import CardForm from './Pagamento'

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          // Se o token não estiver presente, redirecionar o usuário para a página de login
          window.location.replace('/login')
          return
        }

        // Fazer uma requisição para o backend para obter as informações do usuário
        const response = await axios.get('https://localhost:5002/user/perfil', {
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
      <Container>
        <HeaderPerfil>
          <BotaoPerfil to="/Sumario"> Ir para Sumário</BotaoPerfil>
        </HeaderPerfil>
        <h2>Informações do Usuário</h2>
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
        <FormularioCadastro />
        <CardForm userToken={localStorage.getItem('token')} />
      </Container>
    </div>
  )
}

export default Perfil
