const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id_do_produto: { type: String, unique: true },
    nome_do_produto: String,
    codigo_do_produto: {type: Number, unique: true},
    descricao_do_produto: String,
    preco_do_produto: Number // Para o mongooseSchema, decimais se enquadram como Number
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product