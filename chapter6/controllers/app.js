const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('../data/dataAccess.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// respond with specified user data
app.get('/api/user/:userId', function(req, res) {
    const userId = req.params.userId
    db.userDb.getUser(userId, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.get('/api/user', function(req, res) {
    db.userDb.getUsers(function(err, result) {
        if (!err) {
            res.send(result)
        } else {
            console.log(result)

            res.status(500).send('Some error')
        }
    })
})

app.post('/api/user', function(req, res) {
    // username, email, role, password

    db.userDb.addUser(
        req.body.username,
        req.body.email,
        req.body.role,
        req.body.password,
        function(err, result) {
            if (err) {
                console.log(err)
                res.status(500).send('Some error')
            } else {
                res.send(result + ' record inserted')
            }
        }
    )
})

app.put('/api/user/:userId', function(req, res) {
    const userId = req.params.userId

    db.userDb.updateUser(req.body.email, req.body.password, userId, function(
        err,
        result
    ) {
        if (err) {
            console.log(err)
            res.status(500).send('Some error')
        } else {
            res.send(result + ' record updated')
        }
    })
})

app.delete('/api/user/:userId', function(req, res) {
    const userId = req.params.userId

    db.userDb.deleteUser(userId, function(err, result) {
        if (err) {
            console.log(err)
            res.status(500).send('Some error')
        } else {
            res.send(result + ' record deleted')
        }
    })
})

app.get('/api/categories', function(req, res) {
    db.categoryDb.getCategories(function(err, result) {
        if (err) {
            console.log(result)
            res.status(500).send('Some error')
        } else {
            res.json(result)
        }
    })
})

app.get('/api/categories/:categoryId/furnitures', function(req, res) {
    const categoryId = req.params.categoryId

    db.furnitureDb.getFurnituresByCategory(categoryId, function(err, result) {
        if (err) {
            console.log(result)
            res.status(500).send('Some error')
        } else {
            res.json(result)
        }
    })
})

module.exports = app
