const usersDb = require('./users')
const postsDb = require('./posts')

const db = {
    users: usersDb,
    posts: postsDb,
}

module.exports = db
