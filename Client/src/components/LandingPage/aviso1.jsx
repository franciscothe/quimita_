// src/components/MethodologySection.js
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SectionWrapper = styled.section`
  padding: 40px 20px;
  text-align: center;
`

const Aviso1 = () => {
  return (
    <section className=" py-4">
      <div className="container text-center">
        <h2>
          {' '}
          Estamos em fase de testes!
          <h2>Aproveite o acesso gratuito à nossa plataforma até 31/12/2024</h2>
        </h2>
      </div>
    </section>
  )
}

export default Aviso1
