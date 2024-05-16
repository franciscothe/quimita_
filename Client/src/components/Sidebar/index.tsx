import React, { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Modal,
  Button
} from '@mui/material'
import Calculadora from '../Calculadora'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isCalculatorOpen, setCalculatorOpen] = useState(false)
  const [isPDFVisible, setPDFVisible] = useState(false)
  const [isGlossaryVisible, setGlossaryVisible] = useState(false)
  const [isPeriodicTableVisible, setPeriodicTableVisible] = useState(false)

  const handleCalculatorClick = () => {
    openPDFViewer('https://www.desmos.com/scientific?lang=pt-BR')
  }

  const closeCalculator = () => {
    setCalculatorOpen(false)
  }

  const openPDFViewer = (pdfURL: string) => {
    setPDFVisible(true)
    setGlossaryVisible(false)
    setPeriodicTableVisible(false)
    setPDFURL(pdfURL)
  }

  const openGlossaryViewer = () => {
    openPDFViewer(
      'https://drive.google.com/file/d/1PH7QlX7kzQ27UHgpwCMFq3dXTuk648wV/preview'
    )
  }

  const openPeriodicTableViewer = () => {
    openPDFViewer(
      'https://drive.google.com/file/d/1B7NLr9Cb7q6EHusLcBReV4Txcx9Fy_JZ/preview'
    )
  }

  const openAtkinsManual = () => {
    openPDFViewer(
      'https://drive.google.com/file/d/1Pdv2lj8nCybxkLkEmLNHT04qpM4gnuoZ/preview'
    )
  }

  const closePDFViewer = () => {
    setPDFVisible(false)
    setGlossaryVisible(false)
    setPeriodicTableVisible(false)
  }

  const [pdfURL, setPDFURL] = useState('')

  return (
    <div>
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <List>
          <ListItem button onClick={handleCalculatorClick}>
            <ListItemText primary="Calculadora" />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              openPDFViewer(
                'https://drive.google.com/file/d/1ILuy6IobFkIeRKA4l_jwR1OM6tjIglfl/preview'
              )
            }
          >
            <ListItemText primary="Tabelas" />
          </ListItem>
          <ListItem button onClick={openGlossaryViewer}>
            <ListItemText primary="Glossário Atkins" />
          </ListItem>
          <ListItem button onClick={openPeriodicTableViewer}>
            <ListItemText primary="Tabela Periódica" />
          </ListItem>
          <ListItem button onClick={openAtkinsManual}>
            <ListItemText primary="Respostas Físico Quiímica Atkins - 11° Edição" />
          </ListItem>
        </List>
      </Drawer>

      {isCalculatorOpen && <Calculadora onClose={closeCalculator} />}

      <Modal open={isPDFVisible} onClose={closePDFViewer}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <iframe
            src={pdfURL}
            width="100%"
            height="90%"
            frameBorder="0"
            title="PDF Viewer"
          />
          <Button onClick={closePDFViewer} variant="contained" color="primary">
            Fechar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Sidebar
