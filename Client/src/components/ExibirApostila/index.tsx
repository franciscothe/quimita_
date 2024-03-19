import React from 'react'
import { useParams } from 'react-router-dom'
import { TodasMaterias } from '../Propriedades'

function encontrarApostilaDaLicaoPorID(id: string): string | null {
  for (const materia of TodasMaterias) {
    for (const licao of materia.licoes) {
      if (licao.linkLicao === `./${id}`) {
        return licao.apostila //
      }
    }
  }
  return null
}

export const PdfViewer = () => {
  const { id } = useParams()
  const IdProcurado = id || ''
  const apostilaDaLicao = encontrarApostilaDaLicaoPorID(IdProcurado)
  return (
    <div>
      {apostilaDaLicao !== null ? (
        <iframe
          src={apostilaDaLicao}
          width="100%"
          height="480"
          allow="autoplay"
        ></iframe>
      ) : (
        <p> Não Encontrado</p>
      )}
    </div>
  )
}

export default PdfViewer
