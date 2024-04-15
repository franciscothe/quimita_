import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import Cadastro from '../../pages/Cadastro'
import Login from '../../pages/Login'
import Sumario from '../../pages/Sumario'
import { L1 } from '../Licoes/L1'
import {
  Exercicios,
  Exercicios2,
  Exercicios3,
  Exercicios4,
  Exercicios5
} from '../Exercícios'
import Perfil from '../Perfil'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token // Retorna true se o token existir
}

export const Rotas = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Cadastro',
    element: <Cadastro />
  },
  {
    path: 'Login',
    element: <Login />
  },
  {
    path: 'Sumario',
    element: <Sumario />
  },
  {
    path: 'Sumario/:id',
    element: <L1 />
  },
  {
    path: 'Sumario/:id/Grupo1',
    element: <Exercicios />
  },
  {
    path: 'Sumario/:id/Grupo2',
    element: <Exercicios2 />
  },
  {
    path: 'Sumario/:id/Grupo3',
    element: <Exercicios3 />
  },
  {
    path: 'Sumario/:id/Grupo4',
    element: <Exercicios4 />
  },
  {
    path: 'Sumario/:id/Grupo5',
    element: <Exercicios5 />
  },
  {
    path: '/user/perfil',
    // eslint-disable-next-line react/jsx-no-undef
    element: <Perfil />
  }
])
