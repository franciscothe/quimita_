import { Button } from '@mui/material'
import { useState } from 'react'
import { Cabecalho, CabecalhoImg, HeaderSumario } from './styles'
import { IconSidebar } from '../Icones'
import Sidebar from '../Sidebar'

interface HeaderProps {
  customContent: () => JSX.Element // Definição do tipo para customContent
}

export const Header: React.FC<HeaderProps> = ({ customContent }) => {
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
        {customContent && customContent()}{' '}
      </Cabecalho>
    </HeaderSumario>
  )
}
