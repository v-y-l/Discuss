export default {
  //Fixtures for Discuss

  // Returns lists of users with information on whether you are following them or not
  getUsers: (userId, offset, limit) => {
    let fixture = require('../Fixtures/users.json')
    return {
      ok: true,
      data: { 
        //if index 9 is a part of result, then there is no hasNext
        //that means the reach would be fixture['results'].length
        'hasNext': offset + limit < fixture['results'].length,  
        'offset': offset,
        'limit': limit,
        'results': fixture['results'].slice(offset,offset+limit)
      }
    }
  },
  toggleFollowUser: (userId, toggleUserId) => {
    let fixture = require('../Fixtures/users.json')
    let toggledUser
    for (let user of fixture['results']) {
      if (user['id'] == toggleUserId) {
        user['following'] = !user['following']
        toggledUser = user
        break
      }
    }
    return {
      ok: true,
      data: toggledUser
    }
  },
  getPosts: (offset, limit) => {
    let allData = require('../Fixtures/posts.json').list
    let partialData = allData.slice(offset, offset+limit)
    let partialById = {}
    for (let i = 0; i < partialData.length; i++) {
      let datum = partialData[i]
      partialById[datum.id] = offset + i
    }
    return {
      ok: true,
      data: {
        list: partialData,
        byId: partialById,
        nextOffset: offset + partialData.length,
      }
    }
  },  
  getComments: (postId, offset, limit) => {
    let allData
    if (postId == 1) {
      allData = require('../Fixtures/commentsVictor.json').list
    } else if (postId == 2) {
      allData = require('../Fixtures/commentsJohn.json').list
    } else {
      allData = []
    }
    let partialData = allData.slice(offset, offset+limit)
    return {
      ok: true,
      data: {
        list: partialData,
        nextOffset: offset + partialData.length,
      }
    }
  },
  postComment: (postId, commentAuthor, commentText) => {
    //Require caches the object so the fixture mimics the actual API behavior of having multiple comments
    //https://stackoverflow.com/questions/8887318/understanding-node-js-modules-multiple-requires-return-the-same-object
    let list
    if (postId == 1) {
      list = require('../Fixtures/commentsVictor.json').list
    } else if (postId == 2) {
      list = require('../Fixtures/commentsJohn.json').list
    } else {
      //Only comments to Victor or John (first two posts) will actually save.
      list = []
    }

    let commentId = list.length+1
    list.push({ id: commentId, author: commentAuthor, text:commentText })
    return {
      ok: true
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
