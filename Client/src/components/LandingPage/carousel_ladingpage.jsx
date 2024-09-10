// src/components/FreeAccessSection.js
import styled from 'styled-components'
import imagem1 from './check.webp' // Substitua com o caminho das suas imagens
import { Link } from 'react-router-dom'

const ContentBox = styled.div`
  display: flex;
  flex-direction: column; /* Coloca o conteúdo em coluna */
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000;
  background-color: #ffffffe3;
  border-radius: 20px;
  padding: 20px 50px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Para dar destaque */
  max-width: 600px; /* Limita a largura máxima */
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente o conteúdo */
  margin-bottom: 20px; /* Espaço abaixo do título */
  width: 100%;
  flex-wrap: nowrap; /* Impede que o conteúdo quebre para a próxima linha */
  white-space: nowrap; /* Impede a quebra de linha no texto */
`

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`

const ButtonContainer = styled.div`
  display: flex; /* Coloca os botões lado a lado */
  justify-content: center; /* Espaço entre os botões */
  align-items: center; /* Centraliza verticalmente os botões */
  width: 100%; /* Faz o contêiner ocupar toda a largura disponível */
  margin-top: 10px;

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none; /* Remove sublinhado dos links */
    display: flex; /* Garante que os botões sejam exibidos como blocos flex */
    align-items: center;
    background-color: #73e794; /* Cor de fundo ao passar o mouse */

    &:hover {
      background-color: #0056b3; /* Cor de fundo ao passar o mouse */
    }
  }
`

const FreeAccessSection = () => {
  return (
    <ContentBox>
      <TitleContainer>
        <h3>ACESSO GRATUITO</h3>
        <Icon src={imagem1} alt="Ícone" />
      </TitleContainer>
      <ButtonContainer>
        <Link to="/sumario" className="btn btn-lg">
          LISTA DE LIÇÕES
        </Link>
      </ButtonContainer>
    </ContentBox>
  )
}

export default FreeAccessSection
