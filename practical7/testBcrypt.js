// const bcrypt = require('bcrypt')
// const saltRounds = 10

// const myPlaintextPassword = 'P@ssw0rd'

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     console.log('salt: ' + salt)

//     bcrypt.hash(myPlaintextPassword, salt).then(function(hash) {
//         console.log('hash: ' + hash)

//         bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
//             console.log(result)
//         })

//         bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//             console.log(result)
//         })
//     })
// })

console.log(process.env.JwtSecretKey)
