import React, { useState } from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Modal,
  Button,
  Typography
} from '@mui/material'
import Calculadora from '../Calculadora'
import { useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

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

  const navigate = useNavigate()
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

  const openAtkinsPares = () => {
    openPDFViewer(
      'https://drive.google.com/file/d/18P6K6yQ9NIVKrbXSI2dBtzJB4yvPdutj/preview'
    )
  }

  const openAtkinsImpares = () => {
    openPDFViewer(
      'https://drive.google.com/file/d/1-G95kXuQ4SGDk8GPJJ3vYG-bQY3i0LAA/preview'
    )
  }
  const openPerfil = () => {
    navigate('/')
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
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="bold">
                  Calculadora
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            button
            onClick={() =>
              openPDFViewer(
                'https://drive.google.com/file/d/1T1tlhl0XBT9yP6DB0CCcyx6pKBy5JRhj/preview'
              )
            }
          >
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="bold">
                  Tabelas
                </Typography>
              }
            />
          </ListItem>

          <ListItem
            button
            onClick={() =>
              openPDFViewer(
                'https://drive.google.com/file/d/1ILuy6IobFkIeRKA4l_jwR1OM6tjIglfl/preview'
              )
            }
          >
            <ol>
              <li>Prefixos de múltiplos e submúltiplos da unidade</li>
              <li>Pressão de vapor da água</li>
              <li>Unidades do Sistema Internacional</li>
              <li>Constantes</li>
              <li>Algumas unidades não-SI geralmente usadas</li>
              <li>Elementos químicos e sua massa atômica</li>
              <li>Entalpia de formação</li>
              <li>
                Entalpia de combustão e formação de alguns compostos orgânicos
              </li>
              <li>Energia Livre, Capacidade Calorífica, Entropia</li>
              <li>
                Alguns Compostos Orgânicos: Energia Livre, Capacidade Calorífica
                molar e Entropia Molar
              </li>
              <li>Potencial Padrão a 25 °C</li>
              <li>Configuração Eletrônica do estado fundamental</li>
              <li>Produtos químicos mais comuns</li>
              <li>Constantes do produto de solubilidade a 25°C</li>
              <li>Pressão de vapor da água em várias temperaturas</li>
              <li>Constantes de ionização de ácidos</li>
              <li>Constantes de ionização de bases</li>
              <li>Constantes de formação de alguns íons complexos</li>
            </ol>
            <ListItemText primary="" />
          </ListItem>
          <ListItem button onClick={openGlossaryViewer}>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="bold">
                  Glossário Atkins
                </Typography>
              }
            />
          </ListItem>
          <ListItem button onClick={openPeriodicTableViewer}>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="bold">
                  Tabela Periódica
                </Typography>
              }
            />
          </ListItem>
          <ListItem button onClick={openAtkinsPares}>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="bold">
                  Resolução dos exercícios do livro Príncipios de Química
                  (Atkins 3° edição) - PARES
                </Typography>
              }
            />
          </ListItem>

          <ListItem button onClick={openAtkinsImpares}>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight="bold">
                  Resolução dos exercícios do livro Príncipios de Química
                  (Atkins 3° edição) - ÍMPARES
                </Typography>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Nav.Link href="/user/perfil" style={{ marginTop: '10px' }}>
                  Acessar minhas informações
                </Nav.Link>
              }
            />
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
