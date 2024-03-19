import React, { useState, ChangeEvent, FormEvent } from 'react'

const FormularioLogin: React.FC = () => {
  const [usuario, setUsuario] = useState<string>('')
  const [senha, setSenha] = useState<string>('')

  const handleUsuarioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsuario(event.target.value)
  }

  const handleSenhaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSenha(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Usuário:', usuario)
    console.log('Senha:', senha)
    setUsuario('')
    setSenha('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usuario">Usuário:</label>
        <input
          type="text"
          id="usuario"
          value={usuario}
          onChange={handleUsuarioChange}
        />
      </div>
      <div>
        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={handleSenhaChange}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default FormularioLogin
