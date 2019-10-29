const http = require('http')
const fs = require('fs')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/Login') {
        if (req.method === 'GET') {
            fs.createReadStream('./login-ajax.html').pipe(res)
        }

        if (req.method === 'POST') {
            let body = null

            req.on('error', err => {
                console.error(err)
            })
                .on('data', chunk => {
                    // json post
                    body = JSON.parse(chunk.toString())
                })
                .on('end', () => {
                    console.log(body) // { username: '', password: '' }
                    if (
                        body.username === 'admin@abc.com' &&
                        body.password === '1234567'
                    ) {
                        // success case
                        res.end('Welcome admin')
                    } else {
                        // failure case
                        fs.createReadStream('./login-ajax.html').pipe(res)
                    }
                })
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`)
})
