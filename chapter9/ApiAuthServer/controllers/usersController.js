const db = require('../data')
const verifyToken = require('../auth/verifyToken')

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

        app.get('/api/users/:userId', function(req, res) {
            const userId = req.params.userId

            db.users.getById(userId, function(err, user) {
                if (err) {
                    res.status(500)
                    res.json({
                        code: err.code,
                        message: err.message,
                    })
                    return
                }

                delete user.password

                res.json(user)
            })
        })

        app.put('/api/users', verifyToken, function(req, res) {
            const { userId } = req

            db.users.update(userId, req.body.name, function(err, affectedRows) {
                if (err) {
                    res.status(500)
                    res.json({
                        code: err.code,
                        message: err.message,
                    })

                    return
                }

                res.status(204)
                res.send()
            })
        })

        app.put('/api/updatePassword', verifyToken, function(req, res) {
            const { userId } = req
            db.users.updatePassword(
                userId,
                req.body.oldPassword,
                req.body.newPassword,
                function(err, affectedRows) {
                    if (err) {
                        res.status(500)
                        res.json({
                            code: err.code,
                            message: err.message,
                        })

                        return
                    }

                    res.status(204)
                    res.send()
                }
            )
        })

        app.delete('/api/users', verifyToken, function(req, res) {
            // const userId = req.userId
            const { userId } = req

            db.users.delete(userId, function(err, affectedRows) {
                if (err) {
                    res.status(500)
                    res.json({
                        code: err.code,
                        message: err.message,
                    })

                    return
                }

                res.status(204)
                res.send()
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
