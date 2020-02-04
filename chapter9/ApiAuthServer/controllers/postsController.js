const multer = require('multer')
const db = require('../data')
const verifyToken = require('../auth/verifyToken')

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    },
})

let upload = multer({ storage: storage })

const postsController = {
    init(app) {
        app.post(
            '/api/posts',
            verifyToken,
            upload.single('postImage'),
            function(req, res) {
                const { userId } = req
                const postImage = req.file

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
            }
        )

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
