import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { CampoPagamento, FormularioPgto } from './styles'
import 'bootstrap/dist/css/bootstrap.min.css'

const FormPerfil = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [numeroCartao, setNumeroCartao] = useState('')
  const [dataExpiracao, setDataExpiracao] = useState('')
  const [codigoSeguranca, setCodigoSeguranca] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dados do formulário:', {
      nome,
      email,
      numeroCartao,
      dataExpiracao,
      codigoSeguranca
    })
  }

  return (
    <Container>
      <Row className="mt-1">
        <Col md={{ span: 8, offset: 2 }}>
          <CampoPagamento>
            <FormularioPgto>
              <div className="inputs-pgto">
                <label> Número do Cartão: </label>
                <input
                  type="text"
                  inputMode="text" // Define o modo de entrada como texto
                  id="nome"
                  placeholder="Número do cartão"
                />
              </div>

              <div className="inputs-pgto">
                <label> Data de Validade: </label>
                <input
                  type="number"
                  className="form-control"
                  inputMode="text" // Define o modo de entrada como texto
                  id="nome"
                  placeholder="MM/AA"
                />
              </div>

              <div className="inputs-pgto">
                <label> Código de Segurança: </label>
                <input
                  type="number"
                  className="form-control"
                  inputMode="text" // Define o modo de entrada como texto
                  id="nome"
                  placeholder="CVV"
                />
              </div>

              <div className="inputs-pgto">
                <label> Nome do titular: </label>
                <input
                  type="text"
                  className="form-control"
                  inputMode="text" // Define o modo de entrada como texto
                  id="nome"
                  placeholder="Nome do titular"
                />
              </div>
              <div className="inputs-pgto">
                <label>CPF do titular: </label>
                <input
                  type="text"
                  className="form-control"
                  inputMode="text" // Define o modo de entrada como texto
                  id="nome"
                  placeholder="CPF"
                />
              </div>
              <div className="inputs-pgto valor">
                <label>
                  Valor da Assinatura: <b> R$18,00/mês</b>
                </label>
              </div>
            </FormularioPgto>
            <Button variant="primary" type="submit">
              Assinar
            </Button>
          </CampoPagamento>
        </Col>
      </Row>
    </Container>
  )
}

export default FormPerfil
