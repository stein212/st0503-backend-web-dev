const jwt = require('jsonwebtoken')

const config = require('../config')

function verifyToken(req, res, next) {
    console.log(req.headers)

    let token = req.headers['authorization'] //retrieve authorization header’s content
    console.log(token)

    if (!token || !token.includes('Bearer')) {
        //process the token
        res.status(401)
        return res.send({ auth: 'false', message: 'Not authenticated!' })
    } else {
        token = token.split('Bearer ')[1] //obtain the token’s value
        console.log(token)
        jwt.verify(token, config.key, function(err, decoded) {
            //verify token
            if (err) {
                res.status(401)
                return res.end({ auth: false, message: 'Not authenticated!' })
            } else {
                req.id = decoded.id //decode the userid and store in req for use
                req.role = decoded.role //decode the role and store in req for use
                next()
            }
        })
    }
}

module.exports = verifyToken
