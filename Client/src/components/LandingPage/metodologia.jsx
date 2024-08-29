// src/components/MethodologySection.js
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
        <p className="lead text-secondary mb-4">
          Acesse sua conta normalmente e aproveite o benefício que já foi
          estendido para você. As cobranças estão suspensas, e você pode
          continuar aproveitando nossos recursos sem preocupações!
        </p>

        <a href="#explore" className="btn btn btn-lg">
          Fazer login
        </a>
      </div>
    </SectionWrapper>
  )
}

export default Metodologia
