import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { cores } from '../../styles'
import { SmallButton } from '../Login/styles'
import { useNavigate } from 'react-router-dom' // Certifique-se de importar useNavigate

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
        .get('http://localhost:3001/user/perfil', {
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
    <div>
      <h1>Perfil do Usuário</h1>
      <p>Nome: {usuario.nome}</p>
      <p>Email: {usuario.email}</p>
      <SmallButton to="/Sumario" color={cores.laranjaClaro}>
        LIÇÕES
      </SmallButton>{' '}
      {/* Renderize outras informações do usuário conforme necessário */}
    </div>
  )
}

export default Perfil
