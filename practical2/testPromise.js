// function whenFinish(value) {
//     console.log(value)
// }

// function doAsyncStuff() {
//     setTimeout(function() {
//         whenFinish('fdsafdsafda')
//     }, 1000)
// }

function doAsyncStuff() {
    // return a promise object
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            // resolve('fdsafdsafda')
            // check
            reject('failed')
        }, 1000)
    })
}

doAsyncStuff()
    .then(function resolve(value) {
        console.log(value)
    })
    .catch(function reject(errString) {
        console.log(errString)
    })
