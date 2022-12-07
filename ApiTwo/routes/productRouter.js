router = require('express').Router()

const Product = require('../models/Product')

router.post('/', async (req, res) => {

  const {name, price, category} = req.body

  if(!name){
    res.status(422).json({error: 'o nome é obrigatório!'})
    return
  }else if(!price){
    res.status(422).json({error: 'o preço é obrigatório!'})
    return
  }else if(!category){
    res.status(422).json({error: 'a categoria é obrigatória!'})
    return
  }

  const product = {
    name,
    price,
    category
  }

  try {
    await Product.create(product)

    res.status(201).json({message: 'Produto inserido no Sistema com Sucesso!'})

  } catch (error) {
    res.status(500).json({error: error})
  }

})

//read
router.get('/', async (req, res) => {
  try {

    const produto = await Product.find()

    res.status(200).json(produto)
    
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/:id', async (req, res) => {

  const id = req.params.id

  try {

    const product = await Product.findOne({_id: id})

    if(!product){
      res.status(422).json({message: 'O Produto não foi encontrado!'})
      return
    }

    res.status(200).json(product)
    
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { name, price, category } = req.body

  const product = {
    name,
    price,
    category,
  }

  try {
    const updatedProduct = await Product.updateOne({ _id: id }, product)

    if (updatedProduct.matchedCount === 0) {
      res.status(422).json({ message: 'Produto não encontrado!' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const product = await Product.findOne({ _id: id })

  if (!product) {
    res.status(422).json({ message: 'Produto não encontrado!' })
    return
  }

  try {
    await Product.deleteOne({ _id: id })

    res.status(200).json({ message: 'Produto removido com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

module.exports = router
