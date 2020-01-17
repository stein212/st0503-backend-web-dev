const express = require('express')
const bodyParser = require('body-parser')
const verifyToken = require('./auth/verifyToken')
const db = require('./db')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/users', function(req, res) {
    db.users.findAll(function(err, users) {
        if (err) {
            res.status(500)
            res.send()
            return
        }

        for (let user of users) {
            delete user.password
        }

        res.json(users)
    })
})

app.get('/users/:id', function(req, res) {
    const id = req.params.id
    db.users.findById(id, function(err, user) {
        if (err) {
            res.status(500)
            res.send()
            return
        }

        if (user === null) {
            res.status(404)
            res.send()
            return
        }

        delete user.password
        res.json(user)
    })
})

app.post('/users', function(req, res) {
    db.users.insert(req.body, function(err, userId) {
        if (err) {
            res.status(500)
            res.send()
            return
        }

        res.status(201)
        res.json({
            userId,
        })
    })
})

app.post('/login', function(req, res) {
    db.users.login(req.body.username, req.body.password, function(err, token) {
        if (err) {
            if (err.error === 'Invalid credentials') {
                res.status(400)
                res.send()
                return
            }

            res.status(500)
            res.send()
            return
        }

        res.json({
            accessToken: token,
        })
    })
})

app.post('/testToken', verifyToken, function(req, res) {
    res.send(`${req.username} has id ${req.id}`)
})

app.listen(port, function() {
    console.log(`Listening on http://localhost:${port}`)
})
