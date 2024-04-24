import { BotaoClaro } from '../../../components/Botao/styles'
import Logotipo from '../../../components/Logo'
import Titulo from '../../../components/Titulo'
import { cores } from '../../../styles'
import { PaginaInicial } from './styles'

const Abertura = () => (
  <PaginaInicial>
    <Titulo
      fontSize={20}
      texto="Esteja preparado para gabaritar química nos maiores vestibulares do Brasil"
    ></Titulo>
    <Logotipo />
    <Titulo fontSize={25} texto="ITA" />
    <Titulo fontSize={25} texto="IME" />
    <Titulo fontSize={25} texto="FUVEST" />
    <Titulo fontSize={25} texto="ENEM" />

    <div className="div-btn">
      <BotaoClaro to="/Sumario" color={cores.laranja}>
        ACESSAR LIÇÕES
      </BotaoClaro>
      <BotaoClaro to="/Cadastro" color={cores.laranjaClaro}>
        REALIZAR CADASTRO
      </BotaoClaro>
    </div>
  </PaginaInicial>
)

export default Abertura
