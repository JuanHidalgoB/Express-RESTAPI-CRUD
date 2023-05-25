const express = require('express')
const morgan = require('morgan')

const app = express()
const products = [
 {
    id: 1,
    product: 'laptop',
    price: 3000
 },

 {
    id: 2,
    product:'Mouse',
    price: 100
 },

 {
    id: 3,
    product:'Touchpad',
    price: 100
 }
    
]

//middlewares
app.use(morgan('dev'))//logger
app.use(express.json())//para que pueda leer json


app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {
    const newProduct = {id: products.length + 1,...req.body}
    products.push(newProduct)
    console.log(newProduct)
    res.send('Creando productos')
})

app.put('/products', (req, res) => {
    res.send('Actualizando productos')
})

app.delete('/products', (req, res) => {
    res.send('Eliminando productos')
})

app.get('/products/:id', (req, res) => {
    const productFound = products.find((product) => {
        return product.id ===  parseInt(req.params.id) //lee el parametro de id como un string
        }
    )
    if (!productFound) return res.status(404).send('Producto no encontrado')

    res.json(productFound)
})
app.listen(3000)
console.log(`server on port ${3000}`)