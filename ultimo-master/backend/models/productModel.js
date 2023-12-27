const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    nome: String,
    tipo: String,
    image: String,
    price: Number,
    description: String,
    quantity: Number
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;