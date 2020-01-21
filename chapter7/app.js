const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require('./models/user')
const verifyToken = require('./auth/verifyToken')

const port = 3001

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.post('/api/login', function(req, res) {
    let email = req.body.email
    let password = req.body.password

    user.loginUser(email, password, function(err, result) {
        if (!err) {
            res.json({
                accessToken: result,
            })
        } else {
            res.status(500)
            res.send(err)
        }
    })
})

app.post('/api/user', verifyToken, function(req, res) {
    res.send(`You are ${req.id} user`)
})

app.listen(port, function() {
    console.log(`Listening on http://localhost:${port}`)
})
