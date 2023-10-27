import PdfViewer from '../../../components/ExibirApostila'
import { Video } from '../../../components/Video'
import { Header } from '../../../components/Header'
import BotaoGrupos from '../../../components/BotaoGrupos'

export const L1 = () => {
  return (
    <div className="container">
      <Header />
      <div>
        <Video />
        <PdfViewer />
        <BotaoGrupos />
      </div>
    </div>
  )
}
