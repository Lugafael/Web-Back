const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  email: String,
  nome: String,
  senha: String,
})

module.exports = Person
