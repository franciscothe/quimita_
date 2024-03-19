import React, { useState } from 'react'
import { ExibicaoSumario } from '../../components/ExibicaoSumario'
import { IconBook, IconSidebar } from '../../components/Icones'
import Titulo from '../../components/Titulo'
import { TituloSumario } from './styles'
import { TodasMaterias } from '../../components/Propriedades'
import { Header } from '../../components/Header'
import SidebarSumario from '../../components/SidebarSumario'
import { Button } from '@mui/material'

const Sumario = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="container">
      <Header
        customContent={() => (
          <Button
            onClick={toggleSidebar}
            variant="contained"
            style={{ backgroundColor: '#f1d316', color: 'black' }}
          >
            Matérias
          </Button>
        )}
      />
      <TituloSumario>
        <Titulo texto="Lista de Lições" fontSize={28} />
      </TituloSumario>
      {TodasMaterias.map((materia, index) => (
        <ExibicaoSumario
          key={index}
          nomemateria={materia.nomeMateria}
          fundo1={materia.fundo1}
          fundo2={materia.fundo2}
          id={materia.id}
          licoes={materia.licoes}
          linkLicao={''}
          nomeLicao={''}
        />
      ))}

      <SidebarSumario
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        todasAsMaterias={TodasMaterias}
      />
    </div>
  )
}

export default Sumario
