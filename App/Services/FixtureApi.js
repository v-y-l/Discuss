export default {
  //Fixtures for Discuss
  getUsersFollowing: (userId) => { //fix: at some point I'll need to have userId-userName mappings
    return {
      ok: true,
      data: require('../Fixtures/usersFollowing.json')
    }
  },
  toggleUsersFollowing: (userId, toggleUserId) => {
    let usersFollowing = require('../Fixtures/usersFollowing.json')
    usersFollowing.usersFollowing[toggleUserId].following = !usersFollowing.usersFollowing[toggleUserId].following
    return usersFollowing
  },
  getPosts: () => {
    return {
      ok: true,
      data: require('../Fixtures/posts.json')
    }
  },  
  getComments: () => {
    return {
      ok: true,
      data: require('../Fixtures/comments.json')
    }
  },
  postComment: (commentAuthor, commentText) => {
    //Require caches the object so the fixture mimics the actual API behavior of having multiple comments
    //https://stackoverflow.com/questions/8887318/understanding-node-js-modules-multiple-requires-return-the-same-object
    let data = require('../Fixtures/comments.json')
    let commentId = `comment${Object.keys(data.comments).length+1}`
    data.comments[commentId] = { id: commentId, author: commentAuthor, text:commentText }
    data.newCommentId = commentId
    return {
      ok: true,
      data: data,
    }
  },
  postCommentToPost: (commentId, postId) => {
    let data = require('../Fixtures/posts.json')
    data.posts[postId]['comments'].push(commentId)
    return {
      ok: true,
      data: data
    }
  },
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  }
}
