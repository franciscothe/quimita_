import styled from 'styled-components'

export const TituloSumario = styled.div`
  display: flex;
  text-align: center;
  margin-top: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin: 10px 50px;

  @media (min-width: 1024px) {
    justify-content: space-around;
  }
  img {
    margin-left: 20px;
  }
`
