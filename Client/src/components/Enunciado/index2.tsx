import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Questoes } from './L1'
import {
  NavBotoes,
  BotoesControles,
  BarraNavegacao,
  ButtonSideBar
} from '../../pages/Exercícios/styles'
import { IconVoltar, IconAvancar, IconSidebar } from '../Icones'
import {
  PaginaExercicios,
  EnunciadoImg,
  BtnResolucao,
  ResolucaoImg,
  TopoPagina,
  PaginaExercicios2
} from './styles'
import { BotaoIrSumario } from '../Botao/styles'
import Sidebar from '../Sidebar'
import { Button } from '@mui/material'
import axios from 'axios' // Importar o axios

export const EnunciadosL1Grupo2 = () => {
  const { id } = useParams<{ id: string }>()
  const gruposDeExercicios = Object.keys(Questoes[`${id}`] || {})
  const indiceDoGrupoAtual = gruposDeExercicios.indexOf('grupo2')
  const navigate = useNavigate()

  const [exercicioAtualIndex, setExercicioAtualIndex] = useState<number>(0)
  const [mostrarResolucao, setMostrarResolucao] = useState<boolean>(false)
  const [mostrarEnunciado, setMostrarEnunciado] = useState<boolean>(true)
  const [usuario, setUsuario] = useState(null) // Inicializar o estado do usuário
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // // useEffect(() => {
  // //   const token = localStorage.getItem('token')
  // //   if (token) {
  // //     axios
  // //       .get('/Sumario/L1/grupo2', {
  // //         headers: {
  // //           Authorization: `Bearer ${token}`
  // //         }
  // //       })
  // //       .then((response) => {
  // //         // Atualiza o estado com as informações do usuário
  // //         setUsuario(response.data.user)
  // //       })
  // //       .catch((error) => {
  // //         console.error('Erro ao buscar informações do usuário:', error)
  // //         navigate('/login') // Redireciona para a página de login em caso de erro
  // //       })
  // //   } else {
  // //     navigate('/login') // Redireciona para a página de login se não houver token
  // //   }
  // // }, [navigate])

  // if (!usuario) {
  //   return <div>Carregando...</div>
  // }

  const exerciciosL1grupo2 = Questoes[`${id}`]?.grupo2?.exercicios || []
  const exercicioAtual = exerciciosL1grupo2[exercicioAtualIndex]

  const mostrarExercicioAnterior = () => {
    if (exercicioAtualIndex > 0) {
      // Se não for o primeiro exercício do grupo atual, volte para o exercício anterior
      setExercicioAtualIndex(exercicioAtualIndex - 1)
    } else {
      // Se for o primeiro exercício do grupo atual, direcione para a rota "grupo2"
      navigate(`/Sumario/${id}/Grupo1`)
    }
    setMostrarResolucao(false) // Adicionado para redefinir mostrarResolucao
  }

  const mostrarProximoExercicio = () => {
    if (exercicioAtualIndex < exerciciosL1grupo2.length - 1) {
      // Se ainda houver exercícios no grupo atual, avance para o próximo exercício
      setExercicioAtualIndex(exercicioAtualIndex + 1)
    } else {
      // Se estiver no último exercício do grupo 1, redirecione para a rota /Sumario/${id}/Grupo2
      navigate(`/Sumario/${id}/Grupo2`)
    }
    setMostrarResolucao(false) // Adicionado para redefinir mostrarResolucao
  }

  const toggleMostrarResolucao = () => {
    setMostrarResolucao(!mostrarResolucao)
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }
  useEffect(() => {
    setMostrarResolucao(false)
  }, [exercicioAtualIndex])

  return (
    <div>
      <TopoPagina>
        <h3> {id} - Grupo 2</h3>
        <BotaoIrSumario to="/Sumario">Lições</BotaoIrSumario>
      </TopoPagina>
      <BarraNavegacao>
        <Button onClick={toggleSidebar} variant="contained" color="primary">
          <IconSidebar />
        </Button>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        <div className="navExercicios">
          <EnunciadoButtons
            exercicios={exerciciosL1grupo2}
            exercicioAtualIndex={exercicioAtualIndex}
            setExercicioAtualIndex={setExercicioAtualIndex}
          />
        </div>
      </BarraNavegacao>

      <PaginaExercicios2>
        <div>
          {mostrarEnunciado && (
            <div>
              {Array.isArray(exercicioAtual.enunciado) ? (
                <EnunciadoImg>
                  {exercicioAtual.enunciado.map((url, index) => (
                    <img
                      key={index}
                      src={`/Images/${id}/${url}`}
                      alt={`Enunciado do exercício ${exercicioAtual.ex}`}
                    />
                  ))}
                </EnunciadoImg>
              ) : (
                <EnunciadoImg>
                  <img
                    src={`/Images/${id}/${exercicioAtual.enunciado}`}
                    alt={`Enunciado do exercício ${exercicioAtual.ex}`}
                  />
                </EnunciadoImg>
              )}
            </div>
          )}
        </div>

        <NavBotoes>
          <BotoesControles onClick={mostrarExercicioAnterior}>
            <IconVoltar />
          </BotoesControles>

          <BtnResolucao
            onClick={() => {
              toggleMostrarResolucao()
              setTimeout(scrollToBottom, 100)
            }}
          >
            RESOLUÇÃO
          </BtnResolucao>

          <BotoesControles
            onClick={mostrarProximoExercicio}
            disabled={
              exercicioAtualIndex === exerciciosL1grupo2.length - 1 &&
              (indiceDoGrupoAtual === -1 ||
                indiceDoGrupoAtual === gruposDeExercicios.length - 1)
            }
          >
            <IconAvancar />
          </BotoesControles>
        </NavBotoes>
        <div>
          {mostrarResolucao && (
            <div>
              {Array.isArray(exercicioAtual.resposta) ? (
                <ResolucaoImg>
                  {exercicioAtual.resposta.map((url, index) => (
                    <img
                      key={index}
                      src={`/Images/${id}/${url}`}
                      alt={`Resposta do exercício ${exercicioAtual.ex}`}
                    />
                  ))}
                </ResolucaoImg>
              ) : (
                <ResolucaoImg>
                  <img
                    src={`/Images/${id}/${exercicioAtual.resposta}`}
                    alt={`Resposta do exercício ${exercicioAtual.ex}`}
                  />
                </ResolucaoImg>
              )}
            </div>
          )}
        </div>
      </PaginaExercicios2>
    </div>
  )
}

const EnunciadoButtons = ({
  exercicios,
  exercicioAtualIndex,
  setExercicioAtualIndex
}: {
  exercicios: unknown[]
  exercicioAtualIndex: number
  setExercicioAtualIndex: (index: number) => void
}) => {
  return (
    <>
      {exercicios.map((exercicio, index) => (
        <button
          key={index}
          onClick={() => setExercicioAtualIndex(index)}
          style={{
            fontWeight: exercicioAtualIndex === index ? 'bold' : 'normal'
          }}
        >
          {index + 1}
        </button>
      ))}
    </>
  )
}
