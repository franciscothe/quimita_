import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Cabecalho, HeaderSumario } from '../../components/Header/styles'
import { Header } from '../../components/Header'
import { SmallButton } from '../Login/styles'

const Perfil = () => {
  const [userInfo, setUserInfo] = useState(null)

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const token = localStorage.getItem('token')
  //       if (!token) {
  //         // Se o token não estiver presente, redirecionar o usuário para a página de login
  //         window.location.replace('/login')
  //         return
  //       }

  //       // Fazer uma requisição para o backend para obter as informações do usuário
  //       const response = await axios.get('/user/perfil', {
  //         headers: {
  //           Authorization: `Bearer ${token}` // Enviar o token armazenado no localStorage no cabeçalho da requisição
  //         }
  //       })

  //       setUserInfo(response.data)
  //       console.log(response.data)
  //     } catch (error) {
  //       // Se houver erro ao obter as informações do usuário, tratar o erro aqui
  //       console.error('Erro ao obter as informações do usuário:', error)
  //     }
  //   }

  //   fetchUserProfile()
  // }, [])

  return (
    <div>
      <HeaderSumario>
        <SmallButton to="/Sumario"> Lições </SmallButton>
      </HeaderSumario>
      <Cabecalho></Cabecalho>

      <h2>Perfil do Usuário</h2>
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
    </div>
  )
}

export default Perfil
