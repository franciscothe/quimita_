import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { cores } from '../../styles'
import { SmallButton } from '../Login/styles'
import { useNavigate } from 'react-router-dom' // Certifique-se de importar useNavigate
import { HeaderSumario } from '../../components/Header/styles'
import { Container } from '@mui/material'

interface Usuario {
  nome: string
  email: string
}

const Perfil = () => {
  // Especifica que o estado pode ser `null` ou um objeto do tipo `Usuario`
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const navigate = useNavigate() // Inicializa o hook useNavigate

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('http://15.228.202.76:3333/user/perfil', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          // Atualiza o estado com as informações do usuário
          setUsuario(response.data.user)
        })
        .catch((error) => {
          console.error('Erro ao buscar informações do usuário:', error)
          navigate('/login') // Redireciona para a página de login em caso de erro
        })
    } else {
      navigate('/login') // Redireciona para a página de login se não houver token
    }
  }, [navigate])

  if (!usuario) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <Container>
        <div>
          <HeaderSumario>
            <SmallButton to="/Sumario" color={cores.azulHeader}>
              {' '}
              Lições
            </SmallButton>
          </HeaderSumario>

          <h2>Meus dados</h2>
          <p>Nome: {usuario.nome}</p>
          <p>Email: {usuario.email}</p>
        </div>

        <div>
          <h2>Pagamento</h2>
          <form action="">
            <label>Número do cartão:</label>
            <input type="number" />
            <br></br>
            <label>Nome escrito no cartão:</label>
            <input type="number" />
          </form>
        </div>
      </Container>
    </>
  )
}

export default Perfil
