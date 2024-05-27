import React from 'react'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BotaoClaro } from '../../components/Botao/styles'
import { cores } from '../../styles'
import NavBarUsuario from '../../components/BarraNavegacao'

function BasicExample() {
  return (
    <>
      <BotaoClaro to="/Sumario" color={cores.laranja}>
        VER LISTA DE LIÇÕES
      </BotaoClaro>
    </>
  )
}

export default BasicExample
