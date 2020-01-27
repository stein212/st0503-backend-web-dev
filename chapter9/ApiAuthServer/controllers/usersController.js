const db = require('../data')

const usersController = {
    init(app) {
        app.get('/api/users/test', function(req, res) {
            res.send('users working')
        })

        app.post('/api/users', function(req, res) {
            db.users.add(
                req.body.username,
                req.body.password,
                req.body.name,
                function(err, userId) {
                    if (err) {
                        if (err.code === 'duplicate') {
                            res.status(422)
                            res.json({
                                code: err.code,
                                message: err.message,
                            })
                            return
                        }

                        res.status(500)
                        res.json({
                            code: err.code,
                            message: err.message,
                        })
                        return
                    }

                    res.status(201)
                    res.json({
                        id: userId,
                    })
                }
            )
        })

        app.get('/api/users', function(req, res) {
            db.users.getAll(function(err, users) {
                if (err) {
                    res.status(500)
                    res.json({
                        code: err.code,
                        message: err.message,
                    })
                    return
                }

                // remove password field
                for (let user of users) {
                    delete user.password
                }

                res.json(users)
            })
        })

        app.post('/api/login', function(req, res) {
            db.users.login(req.body.username, req.body.password, function(
                err,
                accessToken
            ) {
                if (err) {
                    // if login credentials are invalid
                    if (err.code === 'invalid-credentials') {
                        res.status(401)
                        res.json({
                            code: err.code,
                            message: err.message,
                        })

                        return
                    }

                    // handle other errors

                    res.status(500)
                    res.json({
                        code: err.code,
                        message: err.message,
                    })

                    return
                }

                res.json({
                    accessToken,
                })
            })
        })
    },
}

module.exports = usersController
