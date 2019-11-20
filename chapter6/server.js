const app = require('./controllers/app.js')

const port = 8081

const server = app.listen(port, function() {
    console.log(`Web App Hosted at http://localhost:${port}`)
})
