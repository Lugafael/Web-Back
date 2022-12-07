const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
  name: String,
  price: Number,
  category: String,
})

module.exports = Product
