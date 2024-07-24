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
import { Button, List } from '@mui/material'
import axios from 'axios' // Importar o axios
import { TodasMaterias } from '../Propriedades'
import LicaoDetalhes from '../Nomelicao'
import { MateriasSumario } from '../ExibicaoSumario/styles'

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

  const exerciciosL1Grupo2 = Questoes[`${id}`]?.grupo2?.exercicios || []
  const exercicioAtual = exerciciosL1Grupo2[exercicioAtualIndex]

  const mostrarExercicioAnterior = () => {
    if (exercicioAtualIndex > 0) {
      // Se não for o primeiro exercício do grupo atual, volte para o exercício anterior
      setExercicioAtualIndex(exercicioAtualIndex - 1)
    } else {
      // Se for o primeiro exercício do grupo atual, direcione para a rota "Grupo2"
      navigate(`/Sumario/${id}/Grupo1`)
    }
  }

  const mostrarProximoExercicio = () => {
    if (exercicioAtualIndex < exerciciosL1Grupo2.length - 1) {
      // Se ainda houver exercícios no grupo atual, avance para o próximo exercício
      setExercicioAtualIndex(exercicioAtualIndex + 1)
    } else {
      // Se estiver no último exercício do grupo 1, redirecione para a rota /Sumario/${id}/Grupo2
      navigate(`/Sumario/${id}/Grupo3`)
    }
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

  // Adicione este useEffect para redefinir mostrarResolucao quando o exercício atual mudar
  useEffect(() => {
    setMostrarResolucao(false)
  }, [exercicioAtualIndex])
  const idLicao = `${id}` // ID da lição que você deseja buscar

  return (
    <div>
      <TopoPagina>
        <>
          <h3> {id} - Grupo 2</h3>

          <BotaoIrSumario to="/Sumario">Lições</BotaoIrSumario>
        </>
      </TopoPagina>
      <BarraNavegacao>
        <Button onClick={toggleSidebar} variant="contained" color="primary">
          <IconSidebar />
        </Button>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <>
          <div className="navExercicios">
            <div>
              <LicaoDetalhes idLicao={idLicao} />
              <EnunciadoButtons
                exercicios={exerciciosL1Grupo2}
                exercicioAtualIndex={exercicioAtualIndex}
                setExercicioAtualIndex={setExercicioAtualIndex}
              />
            </div>
          </div>
        </>
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
              exercicioAtualIndex === exerciciosL1Grupo2.length - 1 &&
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
            fontWeight: exercicioAtualIndex === index ? 'bold' : 'normal',
            backgroundColor:
              exercicioAtualIndex === index ? '#294f29' : 'normal',
            color: exercicioAtualIndex === index ? '#fff' : 'normal'
          }}
        >
          {index + 1}
        </button>
      ))}
    </>
  )
}
function next() {
  throw new Error('Function not implemented.')
}
