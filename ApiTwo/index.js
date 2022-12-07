const express = require('express')
const mongoose = require('mongoose')
const app = express()



//ler JSON
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

//rotas da API
const productRoutes = require('./routes/productRouter')

app.use('/product', productRoutes)

//endpoint
app.get('/', (req,res) => {

  res.json({message: 'Hello'})

})

//porta
const DB_USER = 'RenanRibeiro'
const DB_PASSWORD = encodeURIComponent('renanpedrosa')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apiclusterdois.h6maewo.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  console.log('Conectou')
  app.listen(3000)
})
.catch((err) => console.log(err))

//mongodb+srv://RenanRibeiro:<password>@apiclusterdois.h6maewo.mongodb.net/?retryWrites=true&w=majority
