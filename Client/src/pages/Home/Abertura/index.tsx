import React, { useEffect, useState } from 'react'
import { BotaoClaro } from '../../../components/Botao/styles'
import Logotipo from '../../../components/Logo'
import Titulo from '../../../components/Titulo'
import { cores } from '../../../styles'
import FormularioLogin from '../../Login'
import { PaginaInicial } from './styles'
import FormularioLogin2 from '../../Login/index2'
import NavBarUsuario from '../../../components/BarraNavegacao'
import imagemTutorial from '../../Perfil/Formularios/Ativo 1.jpg'

const Abertura = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsUserLoggedIn(true)
    }
  }, [])

  return (
    <>
      <NavBarUsuario />
      <PaginaInicial>
        {isUserLoggedIn ? (
          <>
            <Titulo fontSize={20} texto="" />
            <FormularioLogin2 />{' '}
            <img src={imagemTutorial} style={{ marginBottom: '60px' }} />
          </>
        ) : (
          <>
            <Titulo
              fontSize={20}
              texto="Esteja preparado para gabaritar química nos maiores vestibulares do Brasil"
            />
            <Logotipo />
            <Titulo fontSize={25} texto="ITA" />
            <Titulo fontSize={25} texto="IME" />
            <Titulo fontSize={25} texto="FUVEST" />
            <Titulo fontSize={25} texto="ENEM" />

            <div className="div-btn">
              <FormularioLogin />

              <BotaoClaro to="/Sumario" color={cores.laranja}>
                VER LISTA DE LIÇÕES
              </BotaoClaro>
            </div>
          </>
        )}
      </PaginaInicial>
    </>
  )
}

export default Abertura
