const express = require('express')
const bodyParser = require('body-parser')

const usersController = require('./controllers/usersController')
const postsController = require('./controllers/postsController')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

usersController.init(app)
postsController.init(app)

app.listen(port, function() {
    console.log(`Listening on http://localhost:${port}`)
})
