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
  PaginaExercicios4,
  TopoPagina
} from './styles'
import { BotaoIrSumario } from '../Botao/styles'

export const EnunciadosL1Grupo4 = () => {
  const { id } = useParams<{ id: string }>()
  const gruposDeExercicios = Object.keys(Questoes[`${id}`] || {})
  const indiceDoGrupoAtual = gruposDeExercicios.indexOf('grupo4')
  const navigate = useNavigate()

  const [exercicioAtualIndex, setExercicioAtualIndex] = useState<number>(0)
  const [mostrarResolucao, setMostrarResolucao] = useState<boolean>(false)

  const exerciciosL1Grupo4 = Questoes[`${id}`]?.grupo4?.exercicios || []
  const exercicioAtual = exerciciosL1Grupo4[exercicioAtualIndex]

  const mostrarExercicioAnterior = () => {
    if (exercicioAtualIndex > 0) {
      // Se não for o primeiro exercício do grupo atual, volte para o exercício anterior
      setExercicioAtualIndex(exercicioAtualIndex - 1)
    } else {
      // Se for o primeiro exercício do grupo atual, direcione para a rota "Grupo1"
      navigate(`/Sumario/${id}/Grupo3`)
    }
  }

  const mostrarProximoExercicio = () => {
    if (exercicioAtualIndex < exerciciosL1Grupo4.length - 1) {
      // Se ainda houver exercícios no grupo atual, avance para o próximo exercício
      setExercicioAtualIndex(exercicioAtualIndex + 1)
    } else {
      // Se estiver no último exercício do grupo 1, redirecione para a rota /Sumario/${id}/Grupo4
      navigate(`/Sumario/${id}/Grupo5`)
    }
  }

  useEffect(() => {
    setMostrarResolucao(false)
  }, [exercicioAtualIndex])

  const toggleMostrarResolucao = () => {
    setMostrarResolucao(!mostrarResolucao)
  }

  useEffect(() => {
    if (exercicioAtualIndex === exerciciosL1Grupo4.length - 1) {
      // O redirecionamento para a próxima rota acontecerá apenas quando o botão de avançar for clicado no último exercício do grupo
      return
    }
  }, [exercicioAtualIndex, exerciciosL1Grupo4])

  return (
    <div>
      <TopoPagina>
        <h3> {id} - Grupo 4</h3>
        <BotaoIrSumario to="/Sumario">Lições</BotaoIrSumario>
      </TopoPagina>
      <BarraNavegacao>
        <ButtonSideBar>
          <IconSidebar />
        </ButtonSideBar>

        <div className="navExercicios">
          <EnunciadoButtons
            exercicios={exerciciosL1Grupo4}
            exercicioAtualIndex={exercicioAtualIndex}
            setExercicioAtualIndex={setExercicioAtualIndex}
          />
        </div>
      </BarraNavegacao>

      <PaginaExercicios4>
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
              exercicioAtualIndex === exerciciosL1Grupo4.length - 1 &&
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
      </PaginaExercicios4>
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
