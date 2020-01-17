const mysql = require('mysql')

const dbconnect = {
    getConnection() {
        const connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'user',
            password: 'P@ssw0rd',
            database: 'friendbook',
        })

        return connection
    },
}

module.exports = dbconnect
