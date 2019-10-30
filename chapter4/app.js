const express = require('express') // import express library/framework
const bodyParser = require('body-parser')
const app = express() // create a express object
const fs = require('fs')
const port = 3000

let users = []

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())

app.get('/Login', function(req, res) {
    // log req object
    console.log(req)
    fs.createReadStream('./login.html').pipe(res)
})

app.post('/Login', function(req, res) {
    // log req object
    console.log(req.body)

    // find the user with the specified username

    // then if it exists, check the password specified against
    // the stored password

    // if any of them fail, send back 'Invalid credentials

    // else 'Welcome {username}'

    let specifiedUser = null

    for (let user of users) {
        if (user.username === req.body.username) {
            specifiedUser = user
            break
        }
    }

    // check if there is any user found
    if (specifiedUser === null) {
        res.send('Invalid Credentials')
        return
    }

    // check if password is valid
    if (specifiedUser.password !== req.body.password) {
        res.send('Invalid Credentials')
        return
    }

    res.send(`Welcome ${specifiedUser.username}`)
})

app.get('/Register', function(req, res) {
    fs.createReadStream('./register.html').pipe(res)
})

// allow creation of user
app.post('/Register', function(req, res) {
    // username, email, role, password
    // create a user object
    console.log(req.body)
    let user = {
        username: req.body.username,
        email: req.body.email,
        role: 'Member', // not admin
        password: req.body.password,
    }
    // add the user object to a user storage area
    users.push(user)

    // 'created ' + user.username
    res.send(`created ${user.username}`)
})

//VERB+URL
// Get all created users
app.get('/api/users', function(req, res) {
    res.status(200)
    res.type('.json')
    res.end(JSON.stringify(users))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
