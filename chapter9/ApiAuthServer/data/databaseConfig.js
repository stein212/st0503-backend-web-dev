const mysql = require('mysql')

const dbconnect = {
    getConnection() {
        const conn = mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'P@ssw0rd',
            database: 'chapter9',
        })

        return conn
    },
}

module.exports = dbconnect
