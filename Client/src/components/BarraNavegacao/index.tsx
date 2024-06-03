import React from 'react'
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BotaoClaro } from '../../components/Botao/styles'
import { cores } from '../../styles'

function NavBarUsuario() {
  const navigate = useNavigate()
  const handleLogout = () => {
    // Remove the token from localStorage or any other storage you are using
    localStorage.removeItem('token')

    // Redirect to the login page
    navigate('/')
    window.location.reload()
  }

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#eaf5fb' }}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ margin: '10px' }}>
            <Nav className="me-auto">
              <Nav.Link href="/user/perfil" style={{ marginTop: '10px' }}>
                Minhas Informações
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBarUsuario
