const dbconnect = require('./databaseConfig')

const userDb = {
    getUser(userId, callback) {
        // get connection to mysql
        const conn = dbconnect.getConnection()

        // initiate the connection
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log('Connected!')
                // prepare the sql statement
                const sql = 'SELECT * FROM users WHERE userid = ?'

                // execute the sql query
                conn.query(sql, [userId], function(err, result) {
                    // when finish retrieving data, close connection
                    conn.end()

                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },
    getUsers(callback) {
        // get connection to mysql
        const conn = dbconnect.getConnection()

        conn.connect(function(err) {
            if (err) {
                console.log(err)
                return callback(err)
            } else {
                const sql = 'SELECT * FROM users'

                conn.query(sql, function(err, result) {
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        return callback(null, result)
                    }
                })
            }
        })
    },
    addUser(username, email, role, password, callback) {
        let conn = dbconnect.getConnection()

        conn.connect(function(err) {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log('Connected!')

                let sql =
                    'Insert into users (username,email,role,password) values(?,?,?,?)'

                conn.query(sql, [username, email, role, password], function(
                    err,
                    result
                ) {
                    conn.end()

                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result.affectedRows)

                        return callback(null, result.affectedRows)
                    }
                })
            }
        })
    },
    updateUser(email, password, userId, callback) {
        let conn = dbconnect.getConnection()

        conn.connect(function(err) {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                let sql =
                    'UPDATE Users SET email = ?, password = ? WHERE userid = ?'

                conn.query(sql, [email, password, userId], function(
                    err,
                    result
                ) {
                    conn.end()

                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result.affectedRows)
                        return callback(null, result.affectedRows)
                    }
                })
            }
        })
    },
    deleteUser(userId, callback) {
        let conn = dbconnect.getConnection()

        conn.connect(function(err) {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                let sql = 'DELETE FROM Users WHERE userid = ?'

                conn.query(sql, [userId], function(err, result) {
                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        return callback(null, result.affectedRows)
                    }
                })
            }
        })
    },
}

const categoryDb = {
    getCategories(callback) {
        const conn = dbconnect.getConnection()

        // initiate the connection
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log('Connected!')
                // prepare the sql statement
                const sql = 'SELECT * FROM categories'

                // execute the sql query
                conn.query(sql, function(err, result) {
                    // when finish retrieving data, close connection
                    conn.end()

                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },
}

const furnitureDb = {
    getFurnituresByCategory(categoryId, callback) {
        // get connection to mysql
        const conn = dbconnect.getConnection()

        // initiate the connection
        conn.connect(function(err) {
            if (err) {
                console.log(err)
                return callback(err, null)
            } else {
                console.log('Connected!')
                // prepare the sql statement
                const sql = 'SELECT * FROM furnitures WHERE categoryId = ?'

                // execute the sql query
                conn.query(sql, [categoryId], function(err, result) {
                    // when finish retrieving data, close connection
                    conn.end()

                    if (err) {
                        console.log(err)
                        return callback(err, null)
                    } else {
                        console.log(result)
                        return callback(null, result)
                    }
                })
            }
        })
    },
}

module.exports = {
    userDb,
    categoryDb,
    furnitureDb,
}
