import { Button } from '@mui/material'
import { useState } from 'react'
import { BotaoIrSumario } from '../Botao/styles'
import { IconSidebar } from '../Icones'
import Logotipo from '../Logo'
import Sidebar from '../Sidebar'
import { Cabecalho, CabecalhoImg, HeaderSumario } from './styles'

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <HeaderSumario>
      <Cabecalho>
        <CabecalhoImg>
          <Button onClick={toggleSidebar} variant="contained" color="primary">
            <IconSidebar />
          </Button>
          <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </CabecalhoImg>
        <BotaoIrSumario to="/Sumario">Lições</BotaoIrSumario>
      </Cabecalho>
    </HeaderSumario>
  )
}
