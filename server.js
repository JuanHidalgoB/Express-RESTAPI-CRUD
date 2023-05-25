const express = require('express')
const morgan = require('morgan')

const app = express()
let products = [
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
    id: 4,
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
    let newId = 0

    let idFound = products.find(p => p.id === newId) //por si ya existe el id

     //newId = idFound ? newId + 1: newId

    while (idFound){
        newId++
        idFound = products.find(p => p.id === newId)
    }
    
    const newProduct = {id: newId,...req.body}
    products.push(newProduct)
    console.log(newProduct)
    res.send('Creando productos')
})

app.put('/products/:id', (req, res) => {
    const productFound = products.find(p => p.id === parseInt(req.params.id))
    if (!productFound) return res.status(404).send('Producto no encontrado')

    const newData = req.body

    products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)
    res.send('Actualizando productos')
})

app.delete('/products/:id', (req, res) => {

    const productFound = products.find(p => p.id === parseInt(req.params.id)) //lee el parametro de id como un string por eso el parseo
    if (!productFound) return res.status(404).send('Producto no encontrado')

    products = products.filter(p => {return p.id !== parseInt(req.params.id)}) 

    res.json(products)
})

app.get('/products/:id', (req, res) => {

    const productFound = products.find((product) => {
        return product.id ===  parseInt(req.params.id) //lee el parametro de id como un string por eso el parseo
        }
    )
    if (!productFound) return res.status(404).send('Producto no encontrado')

    res.json(productFound)
})
app.listen(3000)
console.log(`server on port ${3000}`)