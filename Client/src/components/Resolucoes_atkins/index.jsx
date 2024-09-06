import React from 'react'
import { Button, Container } from 'react-bootstrap'

const PdfButton = ({ chapterNumber, url }) => (
  <Button
    variant="primary" // Usando variante do Bootstrap
    onClick={() => window.open(url, '_blank')}
    style={{ margin: '2px' }} // Estilização inline para margem de 2px
  >
    Capítulo {chapterNumber}
  </Button>
)

const ChapterButtons = () => {
  // Substitua os links dos PDFs abaixo pelos links reais de cada capítulo
  const oddPdfLinks = [
    './pdfs/ch01_even_merged_cap1.pdf',
    '/pdfs/ch01_even_merged_cap2.pdf',
    '/pdfs/ch01_even_merged_cap3.pdf',
    '/pdfs/ch01_even_merged_cap4.pdf',
    '/pdfs/ch01_even_merged_cap5.pdf',
    '/pdfs/ch01_even_merged_cap6.pdf',
    '/pdfs/ch01_even_merged_cap7.pdf',
    '/pdfs/ch01_even_merged_cap8.pdf',
    '/pdfs/ch01_even_merged_cap9.pdf',
    '/pdfs/ch01_even_merged_cap10.pdf',
    '/pdfs/ch01_even_merged_cap11.pdf',
    '/pdfs/ch01_even_merged_cap12.pdf',
    '/pdfs/ch01_even_merged_cap13.pdf',
    '/pdfs/ch01_even_merged_cap14.pdf',
    '/pdfs/ch01_even_merged_cap15.pdf',
    '/pdfs/ch01_even_merged_cap16.pdf',
    '/pdfs/ch01_even_merged_cap17.pdf',
    '/pdfs/ch01_even_merged_cap18.pdf',
    '/pdfs/ch01_even_merged_cap19.pdf'
  ]

  const evenPdfLinks = [
    '/path/to/pdf/even-chapter1.pdf',
    '/path/to/pdf/even-chapter2.pdf',
    '/path/to/pdf/even-chapter3.pdf',
    '/path/to/pdf/even-chapter4.pdf',
    '/path/to/pdf/even-chapter5.pdf',
    '/path/to/pdf/even-chapter6.pdf',
    '/path/to/pdf/even-chapter7.pdf',
    '/path/to/pdf/even-chapter8.pdf',
    '/path/to/pdf/even-chapter9.pdf',
    '/path/to/pdf/even-chapter10.pdf',
    '/path/to/pdf/even-chapter11.pdf',
    '/path/to/pdf/even-chapter12.pdf',
    '/path/to/pdf/even-chapter13.pdf',
    '/path/to/pdf/even-chapter14.pdf',
    '/path/to/pdf/even-chapter15.pdf',
    '/path/to/pdf/even-chapter16.pdf',
    '/path/to/pdf/even-chapter17.pdf',
    '/path/to/pdf/even-chapter18.pdf',
    '/path/to/pdf/even-chapter19.pdf'
  ]

  return (
    <Container>
      <h3>Capítulos Ímpares</h3>
      <div>
        {oddPdfLinks.map((url, index) => (
          <PdfButton
            key={`odd-${index + 1}`}
            chapterNumber={index + 1}
            url={url}
          />
        ))}
      </div>
      <h3>Capítulos Pares</h3>
      <div>
        {evenPdfLinks.map((url, index) => (
          <PdfButton
            key={`even-${index + 1}`}
            chapterNumber={index + 1}
            url={url}
          />
        ))}
      </div>
    </Container>
  )
}

export default ChapterButtons
