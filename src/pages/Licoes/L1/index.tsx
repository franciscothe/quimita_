import PdfViewer from '../../../components/ExibirApostila'
import { Video } from '../../../components/Video'
import { Header } from '../../../components/Header'
import BotaoGrupos from '../../../components/BotaoGrupos'
import { BotaoIrSumario } from '../../../components/Botao/styles'

export const L1: React.FC = () => {
  const customContent = () => (
    <BotaoIrSumario to="/Sumario">Lições</BotaoIrSumario>
  )

  return (
    <div className="container">
      <Header customContent={customContent} />{' '}
      <div>
        <Video />
        <PdfViewer />
        <BotaoGrupos />
      </div>
    </div>
  )
}
