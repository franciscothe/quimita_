// src/components/MethodologySection.js
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SectionWrapper = styled.section`
  padding: 40px 20px;
  text-align: center;
`

const Metodologia = () => {
  return (
    <SectionWrapper>
      <div>
        <h2>Aos usuários já cadastrados...</h2>
        <Link to="/login" className="btn btn-lg">
          Fazer login
        </Link>
        <p className="lead text-secondary mb-4">
          A cobrança de sua assinatura está suspensa até 31/12/2024.
        </p>
      </div>
    </SectionWrapper>
  )
}

export default Metodologia
