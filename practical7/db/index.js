const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dbconnect = require('./databaseConfig')

const saltRounds = 10

const users = {
    login(username, password, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = 'SELECT id, password FROM User WHERE username = ?'

            conn.query(sql, [username], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                if (results.length !== 1) {
                    callback({ error: 'Invalid credentials' }, null)
                    return
                }

                const passwordHash = results[0].password

                bcrypt.compare(password, passwordHash).then(function(isMatch) {
                    if (!isMatch) {
                        callback({ error: 'Invalid credentials' }, null)
                        return
                    }

                    let token = jwt.sign(
                        { id: results[0].id, username }, // payload or claims
                        process.env.JwtSecretKey, // secret key
                        {
                            expiresIn: 86400, //expires in 24 hrs
                        }
                    )

                    return callback(null, token)
                })
            })
        })
    },
    findById(userId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = 'SELECT * FROM User WHERE id = ?'

            conn.query(sql, [userId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                if (results.length < 1) {
                    callback(null, null)
                    return
                }

                callback(null, results[0])
            })
        })
    },
    findAll(callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = 'SELECT * FROM User'

            conn.query(sql, function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                callback(null, results)
            })
        })
    },
    insert(user, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            bcrypt.hash(user.password, saltRounds).then(function(hash) {
                const sql = `
                        INSERT INTO User (username, full_name, bio, date_of_birth, password)
                        VALUES
                        (?, ?, ?, ?, ?)
                    `

                conn.query(
                    sql,
                    [
                        user.username,
                        user.full_name,
                        user.bio,
                        user.date_of_birth,
                        hash,
                    ],
                    function(err, result) {
                        conn.end()

                        if (err) {
                            console.log(err)
                            callback(err, null)
                            return
                        }

                        callback(null, result.insertId)
                    }
                )
            })
        })
    },
    edit(userId, user, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = `
                UPDATE User
                SET full_name = ?,
                username = ?,
                bio = ?,
                date_of_birth = ?
                WHERE id = ?
            `

            conn.query(
                sql,
                [
                    user.username,
                    user.full_name,
                    user.bio,
                    user.date_of_birth,
                    userId,
                ],
                function(err, result) {
                    conn.end()

                    if (err) {
                        console.log(err)
                        callback(err, null)
                        return
                    }

                    callback(null)
                }
            )
        })
    },
    addFriend(user1Id, user2Id, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err)
                return
            }

            const sql = `
                INSERT INTO friendship (fk_friend_one_id, fk_friend_two_id)
                VALUES
                (?, ?),
                (?, ?)
            `

            conn.query(sql, [user1Id, user2Id, user2Id, user1Id], function(
                err,
                results
            ) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err)
                    return
                }

                callback(null)
            })
        })
    },
    removeFriend(user1Id, user2Id, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err)
                return
            }

            const sql = `
                DELETE FROM Friendship 
                WHERE fk_friend_one_id IN (?, ?)
                AND fk_friend_two_id IN (?, ?)
            `

            conn.query(sql, [user1Id, user2Id, user2Id, user1Id], function(
                err,
                results
            ) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err)
                    return
                }

                callback(null)
            })
        })
    },
    showFriends(userId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = `
                SELECT u.* FROM User u
                INNER JOIN friendship f
                ON u.id = f.fk_friend_one_id
                WHERE u.id = ?
            `

            conn.query(sql, [userId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                callback(null, results)
            })
        })
    },
}

const posts = {
    findByUserId(userId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = `
                SELECT * FROM Post
                WHERE fk_poster_id = ?
            `

            conn.query(sql, [userId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                callback(null, results)
            })
        })
    },
    findById(postId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = `
                SELECT * FROM Post
                WHERE id = ?
            `

            conn.query(sql, [postId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                callback(null, results[0])
            })
        })
    },
    findAll(callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = `
                SELECT * FROM Post
            `

            conn.query(sql, function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                callback(null, results)
            })
        })
    },
    insert(post, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = `
                INSERT INTO Post (fk_poster_id, text_body)
                VALUES
                (?, ?)
            `

            conn.query(sql, [post.fk_poster_id, post.text_body], function(
                err,
                results
            ) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                callback(null, results.insertId)
            })
        })
    },
    edit(postId, post, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err)
                return
            }

            const sql = `
                UPDATE Post
                SET text_body = ?
                WHERE id = ?
            `

            conn.query(sql, [post.text_body, postId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err)
                    return
                }

                callback(null)
            })
        })
    },
    delete(postId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err)
                return
            }

            const sql = `
                DELETE FROM Post
                WHERE id = ?
            `

            conn.query(sql, [postId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err)
                    return
                }

                callback(null)
            })
        })
    },
    like(userId, postId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err, null)
                return
            }

            const sql = `
                INSERT INTO Likes (fk_user_id, fk_post_id)
                VALUES
                (?, ?)
            `

            conn.query(sql, [userId, postId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err, null)
                    return
                }

                callback(null, results.insertId)
            })
        })
    },
    unlike(userId, postId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err)
                return
            }

            const sql = `
                DELETE FROM Likes 
                WHERE fk_user_id = ?
                AND fk_post_id = ?
            `

            conn.query(sql, [userId, postId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err)
                    return
                }

                callback(null)
            })
        })
    },
    findLikers(postId, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err)
                return
            }

            const sql = `
                SELECT u.* FROM User u
                INNER JOIN Likes l
                ON u.id = l.fk_user_id
                WHERE l.fk_post_id = ?
            `

            conn.query(sql, [postId], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err)
                    return
                }

                callback(null, results)
            })
        })
    },
    findLikersByPostIds(postIds, callback) {
        const conn = dbconnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                callback(err)
                return
            }

            const sql = `
                SELECT u.*, l.fk_post_id FROM User u
                INNER JOIN Likes l
                ON u.id = l.fk_user_id
                WHERE l.fk_post_id IN (?)
            `

            conn.query(sql, [postIds], function(err, results) {
                conn.end()

                if (err) {
                    console.log(err)
                    callback(err)
                    return
                }

                const posts = {}

                for (let postId of postIds) {
                    posts[postId] = []
                }

                console.log(posts)

                for (let liker of results) {
                    const postId = liker.fk_post_id
                    delete liker.fk_post_id
                    posts[postId].push(liker)
                }

                callback(null, posts)
            })
        })
    },
}

module.exports = {
    users,
    posts,
}
