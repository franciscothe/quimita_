import { TituloEstilo } from './styles'

export type Props = {
  texto?: string
  fontSize?: number
  color?: string
  text?: string
}
const Titulo = (props: Props) => (
  <TituloEstilo
    fontSize={props.fontSize}
    color={props.color}
    texto={props.texto}
  >
    {props.texto}
  </TituloEstilo>
)

export default Titulo
