import Titulo from '../Titulo'
import { MateriasSumario } from './styles'
import { Link } from 'react-router-dom'

export type Props = {
  nomemateria?: string
  fundo1: string
  fundo2: string
  fontSize?: number
  color?: string
  text?: string
  licoes: Array<{ linkLicao: string; nomeLicao: string }>
  linkLicao?: string
  nomeLicao?: string
  id?: string
}

export const ExibicaoSumario = (props: Props) => (
  <MateriasSumario
    nomemateria={props.nomemateria}
    fundo1={props.fundo1}
    fundo2={props.fundo2}
    linkLicao={props.linkLicao}
    nomeLicao={props.nomeLicao}
    licoes={props.licoes}
    id={props.id}
  >
    <div className="guiaMateria">
      <Titulo fontSize={22} texto={props.nomemateria} id={props.id} />
    </div>

    <div className="ListaMaterias">
      <ul>
        <div>
          {props.licoes.map((licao, index) => (
            <div key={index} className="listaLicoes">
              <li>
                <Link to={licao.linkLicao}>{licao.nomeLicao}</Link>
              </li>
            </div>
          ))}
        </div>
      </ul>
    </div>
  </MateriasSumario>
)
