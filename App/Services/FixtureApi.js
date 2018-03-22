export default {
  //Fixtures for Discuss
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
    //just a mock endpoint and we can only mimic adding one comment
    let data = require('../Fixtures/comments.json')
    let commentId = `comment${Object.keys(data.comments).length}`
    data['comments'][commentId] = { id: commentId, author: commentAuthor, text:commentText }
    data['comments']['newCommentId'] = commentId
    return {
      ok: true,
      data: data
    }
  },
  postCommentToPost: (commentId, postId) => {
    let posts = require('../Fixtures/posts.json')
    posts[postId][comments].push(commentId)
    return {
      ok: true,
      data: posts
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
