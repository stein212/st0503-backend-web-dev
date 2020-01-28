const dbconnect = require('./databaseConfig')

const postsDb = {
    add(userId, title, body, callback) {
        const conn = dbconnect.getConnection()

        conn.connect(function(err) {
            if (err) {
                callback(
                    {
                        code: 'unknown',
                        message: 'An unknown error occured',
                        inner: err,
                    },
                    null
                )
                return
            }

            const sql = `
                INSERT INTO Posts (userId, title, body)
                VALUES
                (?, ?, ?)
            `

            conn.query(sql, [userId, title, body], function(err, results) {
                if (err) {
                    console.log(err)
                    callback(
                        {
                            code: 'unknown',
                            message: 'An unknown error occured',
                            inner: err,
                        },
                        null
                    )
                    return
                }

                callback(null, results.insertId)
            })
        })
    },
    getAll(callback) {
        const conn = dbconnect.getConnection()

        conn.connect(function(err) {
            if (err) {
                callback(
                    {
                        code: 'unknown',
                        message: 'An unknown error occured',
                        inner: err,
                    },
                    null
                )
                return
            }

            const sql = `
                SELECT * FROM Posts
            `

            conn.query(sql, function(err, results) {
                if (err) {
                    console.log(err)
                    callback(
                        {
                            code: 'unknown',
                            message: 'An unknown error occured',
                            inner: err,
                        },
                        null
                    )
                    return
                }

                callback(null, results)
            })
        })
    },
}

module.exports = postsDb
