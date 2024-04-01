import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const HeaderPerfil = styled.header`
  border: none;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
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
