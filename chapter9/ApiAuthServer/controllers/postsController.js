const db = require('../data')
const verifyToken = require('../auth/verifyToken')

const postsController = {
    init(app) {
        app.post('/api/posts', verifyToken, function(req, res) {
            const { userId } = req

            db.posts.add(userId, req.body.title, req.body.body, function(
                err,
                postId
            ) {
                if (err) {
                    res.status(500)
                    res.json({
                        code: err.code,
                        message: err.message,
                    })

                    return
                }

                res.status(201)
                res.json({
                    postId,
                })
            })
        })

        app.get('/api/posts', function(req, res) {
            db.posts.getAll(function(err, posts) {
                if (err) {
                    res.status(500)
                    res.json({
                        code: err.code,
                        message: err.message,
                    })

                    return
                }

                res.json(posts)
            })
        })
    },
}

module.exports = postsController
