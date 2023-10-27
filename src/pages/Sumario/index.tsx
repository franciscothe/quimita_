import { ExibicaoSumario } from '../../components/ExibicaoSumario'
import { IconBook } from '../../components/Icones'
import Logotipo from '../../components/Logo'
import Titulo from '../../components/Titulo'
import { TituloSumario } from './styles'
import { TodasMaterias } from '../../components/Propriedades'
import { HeaderSumario } from '../../components/Header/styles'

const Sumario = () => {
  return (
    <div className="container">
      <HeaderSumario>
        <Logotipo />
        <h3> Olá Visitante</h3>
      </HeaderSumario>

      <TituloSumario>
        <Titulo texto="Lista de Lições" fontSize={28} />
        <IconBook />
      </TituloSumario>

      {TodasMaterias.map((materia, index) => (
        <ExibicaoSumario
          key={index}
          nomemateria={materia.nomeMateria}
          fundo1={materia.fundo1}
          fundo2={materia.fundo2}
          licoes={materia.licoes} // Passe o array licoes como propriedade
          linkLicao={''}
          nomeLicao={''}
        />
      ))}
    </div>
  )
}

export default Sumario
