import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const HeaderPerfil = styled.header`
  border-bottom: 1px solid black;
  font-size: 20px;
  color: #000;
  cursor: pointer;
  margin: 20px 0;
  text-decoration: none;
  display: flex;
  text-align: center;
  justify-content: center;
`
export const BotaoPerfil = styled(Link)`
  background-color: #5eafdc;
  border: none;
  padding: 2vw 40px;
  border-radius: 20px;
  text-decoration: none;
  color: #fff;
`
export const PagamentoDiv = styled.div`
  background-color: #85d3ff;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  padding: 1vw 20px;
  border-radius: 20px;
  text-decoration: none;
  color: #fff;
  align-items: center;
  width: 100%;
  color: #0c3f5c;
  margin-bottom: 10px;

  h5 {
    border-bottom: 1px solid black;
  }

  button {
    margin: 10px;
    padding: 5px 20vw;
    border-radius: 10px;
    background-color: #458afa;
    color: #fff;
    text-transform: uppercase;
  }
`
export const EnderecooDiv = styled.div`
  background-color: #85d3ff;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  padding: 1vw 20px;
  border-radius: 20px;
  text-decoration: none;
  color: #fff;
  align-items: center;
  width: 100%;
  color: #0c3f5c;
  margin-bottom: 10px;

  h5 {
    border-bottom: 1px solid black;
  }

  button {
    margin: 10px;
    padding: 5px 20vw;
    border-radius: 10px;
    background-color: #458afa;
    color: #fff;
    text-transform: uppercase;
  }
`
