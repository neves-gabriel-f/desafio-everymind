// Importação das dependências
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Importação do modelo que será utilizado para requisições
const Product = require('./models/product')

// Variáveis de ambiente necessária para conexão com banco (revise o arquivo .env)
const DB_USER =  process.env.MONGO_ATLAS_USER_NAME
const DB_PASSWORD = process.env.MONGO_ATLAS_USER_PASSWORD
const DB_URL = process.env.MONGO_ATLAS_DATABASE_URL

const PORT = 3333
const app = express()

app.use(express.json()) // Necessário para ler JSON no corpo das requisições
app.use(cors()) // Necessário para conexão com client

// Requisições 
app.get('/', (req, res) => {
    return res.send(`[OK!] Servidor funcionando na porta ${PORT}`)
 })

app.get('/products', async (req, res) => {
   const products = await Product.find()
   return res.send(products)
})

app.post('/products', async (req, res) => {
    const id_do_produto  = req.body.id_do_produto
    const nome_do_produto  = req.body.nome_do_produto
    const codigo_do_produto = req.body.codigo_do_produto
    const descricao_do_produto = req.body.descricao_do_produto
    const preco_do_produto = req.body.preco_do_produto
    // Cria um novo registro e o atribui à uma constante chamada product
    const product = await Product.create( {
        id_do_produto: id_do_produto,
        nome_do_produto: nome_do_produto,
        codigo_do_produto: codigo_do_produto,
        descricao_do_produto: descricao_do_produto,
        preco_do_produto: preco_do_produto
    })
    return res.send(product)
})

app.put('/products/:id', async (req, res) => {
    const id_do_produto = req.params.id
    const nome_do_produto  = req.body.nome_do_produto
    const codigo_do_produto = req.body.codigo_do_produto
    const descricao_do_produto = req.body.descricao_do_produto
    const preco_do_produto = req.body.preco_do_produto
    // Procura por um registro existente com o determinado id e o atualiza
    const product = await Product.findByIdAndUpdate(id_do_produto, {
        id_do_produto: id_do_produto,
        nome_do_produto: nome_do_produto,
        codigo_do_produto: codigo_do_produto,
        descricao_do_produto: descricao_do_produto,
        preco_do_produto: preco_do_produto
    })
    // Depois de atualizá-lo, o retorna novamente
    await Product.findById(id_do_produto)
    return res.send(product)
})

app.delete('/products/:id', async (req, res) => {
    const id_do_produto = req.params.id
    // Procura por um registro existente com o determinado id e o deleta
    const product = await Product.findByIdAndDelete(id_do_produto)
    return res.send(product)
})

// Inicializa o servidor
app.listen(PORT, () => {
    console.log('[OK] Express em funcionamento!')
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/?retryWrites=true&w=majority`).then(() => console.log("[OK] Conectado com MongoDB!"))
})