router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {

  const {email, nome, senha} = req.body

  if(!nome){
    res.status(422).json({error: 'o nome é obrigatório!'})
    return
  }else if(!email){
    res.status(422).json({error: 'o email é obrigatório!'})
  }else if(!senha){
    res.status(422).json({error: 'a senha é obrigatória!'})
  }

  const person = {
    email,
    nome,
    senha
  }

  try {
    await Person.create(person)

    res.status(201).json({message: 'Usuário inserido no Sistema com Sucesso!'})

  } catch (error) {
    res.status(500).json({error: error})
  }

})

//read
router.get('/', async (req, res) => {
  try {

    const people = await Person.find()

    res.status(200).json(people)
    
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/:id', async (req, res) => {

  const id = req.params.id

  try {

    const person = await Person.findOne({_id: id})

    if(!person){
      res.status(422).json({message: 'O Usuário não foi encontrado!'})
      return
    }

    res.status(200).json(person)
    
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { email, nome, senha } = req.body

  const person = {
    email,
    nome,
    senha,
  }

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person)

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'Usuário não encontrado!' })
    return
  }

  try {
    await Person.deleteOne({ _id: id })

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post('/login', async (req, res) => {
  
  const { email, nome ,senha } = req.body

  const person = {
    email,
    nome,
    senha,
  }

  try {
    const mail = await Person.findOne({email: person.email})
    const user = await Person.findOne({nome: person.nome})
    const password = await Person.findOne({senha: person.senha})
  

  if(!mail || !password ||!user){
    res.status(477).json({message: 'Login Invalido!'})
  }else{
    res.status(477).json({message: 'Login Realizado com sucesso! Bem-vindo ' + person.nome})
  }

  } catch (error) {
    res.status(500).json({erro: error})
    
  }

})

module.exports = router
