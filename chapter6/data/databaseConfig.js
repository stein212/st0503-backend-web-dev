const mysql = require('mysql')

const dbconnect = {
    getConnection: function() {
        const conn = mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'P@ssw0rd',
            database: 'furniture',
        })

        return conn
    },
}

module.exports = dbconnect
