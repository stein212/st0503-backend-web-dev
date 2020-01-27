const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dbconnect = require('./databaseConfig')
const jwtSecretKey = require('../config')

const saltRounds = 13

const usersDb = {
    add(username, password, name, callback) {
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
                INSERT INTO Users (username, password, name)
                VALUES
                (?, ?, ?)
            `

            bcrypt.hash(password, saltRounds).then(function(passwordHash) {
                conn.query(sql, [username, passwordHash, name], function(
                    err,
                    results
                ) {
                    conn.end()

                    if (err) {
                        // checking if there is a duplicate username
                        if (err.code === 'ER_DUP_ENTRY') {
                            callback(
                                {
                                    code: 'duplicate',
                                    message: 'username already exists',
                                    inner: err,
                                },
                                null
                            )
                            return
                        }

                        // handle all other errors
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
                SELECT * FROM Users
            `

            conn.query(sql, function(err, results) {
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

                callback(null, results)
            })
        })
    },

    login(username, password, callback) {
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
                SELECT id, username, password FROM Users
                WHERE username = ?
            `

            conn.query(sql, [username], function(err, results) {
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

                if (results.length === 0) {
                    callback(
                        {
                            code: 'invalid-credentials',
                            message: 'The credentials given are invalid',
                        },
                        null
                    )
                    return
                }

                const user = results[0]

                bcrypt
                    .compare(password, user.password)
                    .then(function(isValidPassword) {
                        if (!isValidPassword) {
                            callback(
                                {
                                    code: 'invalid-credentials',
                                    message:
                                        'The credentials given are invalid',
                                },
                                null
                            )
                            return
                        }

                        const accessToken = jwt.sign(
                            {
                                userId: user.id,
                            },
                            jwtSecretKey
                        )

                        callback(null, accessToken)
                    })
            })
        })
    },
}

module.exports = usersDb
