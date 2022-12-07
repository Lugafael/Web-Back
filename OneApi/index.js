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
const personRoutes = require('./routes/personRouter')

app.use('/person', personRoutes)

//endpoint
app.get('/', (req,res) => {

  res.json({message: 'Check!'})

})

//porta
const DB_USER = 'Lugafael'
const DB_PASSWORD = encodeURIComponent('mp200565')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.o8tfbko.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  console.log('Conectado ao MongoDB')
  app.listen(3000)
})
.catch((err) => console.log(err))
