import styled from 'styled-components'
import { cores } from '../../styles'
import { BotaoClaro } from '../../components/Botao/styles'

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px auto;
  box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  transition: box-shadow 0.3s ease;
  text-align: center;
  font-size: 16px;
  &:focus {
    outline: none; /* Remove a borda de foco padrão */
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5); /* Altera a sombra quando está em foco */
  }
`
export const BtnEnviar = styled.button`
padding: 0.5em;
margin: 10px 0;
width: 100%;
background-color: #20B9E2;
border-radius: 20px;
color: #fff;
font-weight: bold;
font-size: 18px;
}
`
export const FormLogin = styled.form`
  max-width: 70vw;
  width: 100%;
`
export const DivCriarConta = styled.div`
  justify-content: center;
  display: flex;
`
export const LinkCriarConta = styled.a`
  text-decoration: none;
  color: #20b9e2;
`
export const DivGeralLogin = styled.div`
  display: flex;
  justify-content: center;
`
export const SmallButton = styled(BotaoClaro)`
  font-size: 16px;
  padding: 5px 10px;
  margin: 50px 0px;
  color: #e1915c9c
  background-color: #bbe7f580;
`
export const NavLogin = styled.div`
  margin-top: 20px;
`
