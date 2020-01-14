const jwt = require('jsonwebtoken')
const mysql = require('mysql')
const dbConnect = require('./databaseConfig')
const config = require('../config')

const userDb = {
    loginUser(username, password, callback) {
        const conn = dbConnect.getConnection()
        conn.connect(function(err) {
            if (err) {
                callback(err, null)
                return
            }

            const sql = `SELECT id, password FROM user WHERE username = ?`

            conn.query(sql, [username], function(err, result) {
                if (err) {
                    callback({ error: err }, null)
                    return
                }
                if (result.length !== 1 || result[0].password !== password) {
                    callback({ error: 'Invalid credentials' }, null)
                    return
                }

                let token = jwt.sign(
                    { id: result[0].id, username }, // payload or claims
                    config.key, // secret key
                    {
                        expiresIn: 86400, //expires in 24 hrs
                    }
                )

                return callback(null, token)
            })
        })
    },
}

module.exports = userDb
