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
  EnunciadoImg,
  BtnResolucao,
  ResolucaoImg,
  PaginaExercicios2,
  PaginaExercicios5
} from './styles'

export const EnunciadosL1Grupo5 = () => {
  const { id } = useParams<{ id: string }>()
  const gruposDeExercicios = Object.keys(Questoes[`${id}`] || {})
  const indiceDoGrupoAtual = gruposDeExercicios.indexOf('grupo5')
  const navigate = useNavigate()

  const [exercicioAtualIndex, setExercicioAtualIndex] = useState<number>(0)
  const [mostrarResolucao, setMostrarResolucao] = useState<boolean>(false)

  const exerciciosL1Grupo5 = Questoes[`${id}`]?.grupo5?.exercicios || []
  const exercicioAtual = exerciciosL1Grupo5[exercicioAtualIndex]

  const mostrarExercicioAnterior = () => {
    if (exercicioAtualIndex > 0) {
      // Se não for o primeiro exercício do grupo atual, volte para o exercício anterior
      setExercicioAtualIndex(exercicioAtualIndex - 1)
    } else {
      // Se for o primeiro exercício do grupo atual, direcione para a rota "Grupo1"
      navigate(`/Sumario/${id}/Grupo4`)
    }
  }

  const mostrarProximoExercicio = () => {
    if (exercicioAtualIndex < exerciciosL1Grupo5.length - 1) {
      // Se ainda houver exercícios no grupo atual, avance para o próximo exercício
      setExercicioAtualIndex(exercicioAtualIndex + 1)
    } else {
      // Se estiver no último exercício do grupo 1, redirecione para a rota /Sumario/${id}/Grupo5
      navigate(`/Sumario/${id}/Grupo3`)
    }
  }

  useEffect(() => {
    setMostrarResolucao(false)
  }, [exercicioAtualIndex])

  const toggleMostrarResolucao = () => {
    setMostrarResolucao(!mostrarResolucao)
  }

  useEffect(() => {
    if (exercicioAtualIndex === exerciciosL1Grupo5.length - 1) {
      // O redirecionamento para a próxima rota acontecerá apenas quando o botão de avançar for clicado no último exercício do grupo
      return
    }
  }, [exercicioAtualIndex, exerciciosL1Grupo5])

  return (
    <div>
      <h4>Grupo 5</h4>
      <BarraNavegacao>
        <ButtonSideBar>
          <IconSidebar />
        </ButtonSideBar>

        <div className="navExercicios">
          <EnunciadoButtons
            exercicios={exerciciosL1Grupo5}
            exercicioAtualIndex={exercicioAtualIndex}
            setExercicioAtualIndex={setExercicioAtualIndex}
          />
        </div>
      </BarraNavegacao>

      <PaginaExercicios5>
        {Array.isArray(exercicioAtual.enunciado) ? (
          exercicioAtual.enunciado.map((url, index) => (
            <EnunciadoImg key={index}>
              {
                <img
                  src={`/Images/${id}/${url}`}
                  alt={`Enunciado do exercício ${exercicioAtual.ex}`}
                />
              }
            </EnunciadoImg>
          ))
        ) : (
          <EnunciadoImg>
            {
              <img
                src={`/Images/${id}/${exercicioAtual.enunciado}`}
                alt={`Enunciado do exercício ${exercicioAtual.ex}`}
              />
            }
          </EnunciadoImg>
        )}

        <NavBotoes>
          <BotoesControles onClick={mostrarExercicioAnterior}>
            <IconVoltar />
          </BotoesControles>

          <BtnResolucao onClick={toggleMostrarResolucao}>
            RESOLUÇÃO
          </BtnResolucao>

          <BotoesControles
            onClick={mostrarProximoExercicio}
            disabled={
              exercicioAtualIndex === exerciciosL1Grupo5.length - 1 &&
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
      </PaginaExercicios5>
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
