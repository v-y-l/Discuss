export default {
  //Fixtures for Discuss

  // Returns lists of users with information on whether you are following them or not
  getUsers: (offset, limit, searchText) => {
    let allData = require('../Fixtures/users.json').list
    let filteredData
    if (searchText.length > 0) {
      filteredData = allData.filter((user)=>{
        let fullName = user.fullName.toLowerCase()
        return fullName.indexOf(searchText.toLowerCase()) > -1
      })
    } else {
      filteredData = allData
    }
    let partialData = filteredData.slice(offset, offset+limit)
    return {
      ok: true,
      data: { 
        list: partialData,
        nextOffset: offset + partialData.length
      }
    }
  },
  toggleFollowUser: (toggleUserId) => {
    let users = require('../Fixtures/users.json')
    let usersList = users.list
    let usersById = users.byId
    let userIndex = usersById[toggleUserId]
    usersList[userIndex].following = !usersList[userIndex].following
    return {
      ok: true,
    }
  },
  getPosts: (offset, limit) => {
    let allData = require('../Fixtures/posts.json').list

    let users = require('../Fixtures/users.json')
    let usersList = users.list
    let usersById = users.byId
    let filteredData = allData.filter((post) => {
      let userIndex = usersById[post.recipientId]
      let show = usersList[userIndex] ? usersList[userIndex].following : false
      return show
    })
    if (filteredData.length == 0) {
      filteredData = allData
    }

    let partialData = filteredData.slice(offset, offset+limit)
    let partialById = {}
    for (let i = 0; i < partialData.length; i++) {
      let datum = partialData[i]
      partialById[datum.id] = offset + i
    } 
    //hack: we need only a slice of this information 
    //but we can't slice a dictionary
    return {
      ok: true,
      data: {
        list: partialData,
        //need this to display the post header in commentsScreen
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
        totalComments: allData.length
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
  getPseudonym: (postId) => {
    let list
    if (postId == 1) {
      list = require('../Fixtures/commentsVictor.json').list
    } else if (postId == 2) {
      list = require('../Fixtures/commentsJohn.json').list
    } else {
      //Only comments to Victor or John (first two posts) will actually save.
      list = []
    }
    let set = new Set()
    for (let comment of list) {
      set.add(comment.author)
    }
    return {
      ok: true,
      pseudonym: `User ${set.size}`
    }
  }
}
