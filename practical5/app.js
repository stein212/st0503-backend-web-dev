const db = require('./db')

// 3.2
// db.users.findById(100, function(err, user) {
//     console.log(user)
// })

// 3.3
// db.users.findAll(function(err, users) {
//     console.log(users)
// })

// 3.4
// const user = {
//     full_name: 'Julius',
//     username: 'julius',
//     bio: 'Software engineer at Boogle',
//     date_of_birth: '2001-10-16',
// }
// db.users.insert(user, function(err, userId) {
//     console.log(`Created user (${user.username}) with id ${userId}`)
// })

// 3.5
// const editedUser = {
//     full_name: 'Julius Lim',
//     username: 'julius',
//     bio: 'Software engineer at Boogle',
//     date_of_birth: '2001-10-16',
// }

// provide the user id of the user with full_name "Julius"
// it may not be 5 for you
// db.users.edit(5, editedUser, function(err) {
//     if (err) {
//         console.log(err)
//         return
//     }
// })

// 3.6 addFriend
// db.users.addFriend(2, 3, function(err) {
//     if (err) console.log(err)
// })

// 3.6 removeFriend
// db.users.removeFriend(2, 3, function(err) {
//     if (err) console.log(err)
// })

// 3.6 showFriends
// db.users.showFriends(1, function(err, friends) {
//     console.log(friends)
// })

// 3.7
// db.posts.findByUserId(1, function(err, posts) {
//     console.log(posts)
// })

// db.posts.findById(1, function(err, post) {
//     console.log(post)
// })

// db.posts.findAll(function(err, posts) {
//     console.log(posts)
// })

// const post = {
//     fk_poster_id: 1,
//     text_body: 'Test post',
// }
// db.posts.insert(post, function(err, postId) {
//     console.log(`Created new post with id ${postId}`)
// })

// const postToUpdateId = 11
// const updatedPost = {
//     text_body: 'Test post updated',
// }
// db.posts.edit(postToUpdateId, updatedPost, function(err) {
//     if (err) {
//         console.log(`failed to update post with id ${postToUpdateId}`)
//     } else {
//         console.log(`updated post with id ${postToUpdateId}`)
//     }
// })

// const postToDeleteId = 11
// db.posts.delete(postToDeleteId, function(err) {
//     if (err) {
//         console.log(`failed to delete post with id ${postToDeleteId}`)
//     } else {
//         console.log(`deleted post with id ${postToDeleteId}`)
//     }
// })

// db.posts.like(1, 1, function(err, likeId) {
//     console.log(likeId)
// })

// db.posts.unlike(1, 1, function(err) {
//     if (err) {
//         console.log(`failed to unlike`)
//     }
// })

// db.posts.findLikers(1, function(err, likers) {
//     console.log(likers)
// })

// db.posts.findLikersByPostIds([1, 2], function(err, likers) {
//     console.log(likers)
// })
