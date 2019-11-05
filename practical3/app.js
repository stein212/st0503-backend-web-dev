const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

const products = []
let idCounter = 1

app.post('/createProduct', function(req, res) {
    let product = {
        id: idCounter++, // set id = idCounter, idCounter += 1
        name: req.body.name,
        price: req.body.price,
    }

    products.push(product)

    res.status(201)
    res.end()
})

app.get('/getProducts', function(req, res) {
    res.json(products)
})

app.get('/getProduct/:id', function(req, res) {
    let id = +req.params.id

    // find a product based on its id in products array
    for (let product of products) {
        if (product.id === id) {
            // we found the product
            res.json(product)
            return
        }
    }

    // didn't find product
    res.status(404)
    res.end()
})

app.delete('/deleteProduct/:id', function(req, res) {
    let id = +req.params.id
    // res.status(204) // no content: will not send body in response

    let responsePayload = { message: 'nothing to delete' }

    for (let i = 0; i < products.length; i++) {
        let product = products[i]
        if (product.id === id) {
            // found the product we want to delete
            products.splice(i, 1)
            responsePayload = {
                message: `deleted product with id (${product.id})`,
            }
            res.json(responsePayload)
            return
        }
    }

    res.json(responsePayload)
})

app.put('/updateProduct/:id', function(req, res) {
    let id = +req.params.id

    let updateProduct = null

    // find the product to update
    for (let product of products) {
        if (product.id === id) {
            updateProduct = product
            break
        }
    }

    // did not find the product to update
    if (updateProduct === null) {
        res.status(404)
        res.json({ message: "didn't find anything to update" })
        return
    }

    // found the product to update
    // update => {id, name, price}
    updateProduct.name = req.body.name
    updateProduct.price = req.body.price

    res.json({ message: `updated product (${id})` })
})

app.listen(port, 'localhost', () =>
    console.log('listening on http://localhost:3000')
)
