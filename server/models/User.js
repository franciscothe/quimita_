/* eslint-disable no-undef */
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  cpf: String,
  telefone: String,
  endereco: String,
  complemento: String,
  cep: String,
  cidade: String,
  estado: String,
  assinatura: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
