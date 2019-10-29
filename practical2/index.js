const http = require('http')
const fs = require('fs')

const hostname = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/Login') {
        if (req.method === 'GET') {
            fs.createReadStream('./login.html').pipe(res)
        }

        if (req.method === 'POST') {
            let body = {}

            req.on('error', err => {
                console.error(err)
            })
                .on('data', chunk => {
                    // split chunks into their fields based on '&'
                    let fields = chunk.toString().split('&')

                    for (let field of fields) {
                        // split each field into the key (name) and value of the field by '='
                        let keyValuePair = field.split('=')
                        let key = unescape(keyValuePair[0])
                        let value = unescape(keyValuePair[1])

                        body[key] = value
                    }
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
                        fs.createReadStream('./login.html').pipe(res)
                    }
                })
        }
    }
})

server.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`)
})
