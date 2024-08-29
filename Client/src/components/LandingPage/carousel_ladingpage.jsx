// src/components/CarouselSection.js
import { Carousel } from 'react-bootstrap'
import styled from 'styled-components'
import construcao from './construcao.webp' // Ajuste a extensão se necessário
import imagem1 from './check.webp' // Substitua com o caminho das suas imagens
import garoto from './lapis.webp'
const CarouselWrapper = styled.div`
  margin: 20px 0;
  position: relative;
  overflow: hidden; /* Para cortar o conteúdo excedente */
`

const TopCaption = styled(Carousel.Caption)`
  position: absolute;
  top: 50%; /* Centraliza verticalmente */
  left: 50%; /* Centraliza horizontalmente */
  transform: translate(-50%, -50%); /* Ajusta para centralizar corretamente */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000;
  background-color: #ffffffe3;
  border-radius: 20px;
  padding: 120px 50px;
  overflow: hidden; /* Garante que o conteúdo se ajuste */
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); /* Para dar destaque */
  width: 80%; /* Define o quadro para ocupar 50% da largura da imagem */
  height: 30%; /* Ajuste conforme necessário */

  .icon {
    width: 30px;
    height: 30px;
    margin-left: 10px;
  }
`

const CarouselSection = () => {
  return (
    <>
      <CarouselWrapper>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={construcao}
              alt="Primeiro slide"
            />
            <TopCaption>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' // Centraliza o conteúdo interno da div
                }}
              >
                {' '}
                <h2>ACESSO GRATUITO</h2>
                <img src={imagem1} alt="Ícone" className="icon" />
              </div>
            </TopCaption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={garoto} alt="Primeiro slide" />
            <TopCaption>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' // Centraliza o conteúdo interno da div
                }}
              >
                {' '}
                <h2>SUA APROVAÇÃO EM SUAS MÃOS</h2>
              </div>
            </TopCaption>
          </Carousel.Item>
        </Carousel>
      </CarouselWrapper>
    </>
  )
}

export default CarouselSection
