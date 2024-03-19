import { useParams } from 'react-router-dom'
import { TodasMaterias } from '../Propriedades'
import { CaseVideo } from './styles'

function encontrarURLDaLicaoPorID(id: string): string | null {
  for (const materia of TodasMaterias) {
    for (const licao of materia.licoes) {
      if (licao.linkLicao === `./${id}`) {
        return licao.url // Retorna o URL da lição correspondente
      }
    }
  }
  return null
}
export const Video = () => {
  const { id } = useParams()
  const IdProcurado = id || ''
  const urlDaLicao = encontrarURLDaLicaoPorID(IdProcurado)
  return (
    <CaseVideo>
      {urlDaLicao !== null ? (
        <iframe
          src={urlDaLicao}
          title="Vídeo da Lição"
          width="560"
          height="315"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Esta lição não possui video</p>
      )}
    </CaseVideo>
  )
}
