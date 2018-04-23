export default {
  // Fixtures for Discuss

  // Returns lists of users with information on whether you are following them or not
  getUsers: (offset, limit, searchText) => {
    const allData = require('../Fixtures/users.json').list;
    let filteredData;
    if (searchText.length > 0) {
      filteredData = allData.filter((user) => {
        const fullName = user.fullName.toLowerCase();
        return fullName.indexOf(searchText.toLowerCase()) > -1;
      });
    } else {
      filteredData = allData;
    }
    const partialData = filteredData.slice(offset, offset + limit);
    return {
      ok: true,
      data: {
        list: partialData,
        nextOffset: offset + partialData.length,
      },
    };
  },
  toggleFollowUser: (toggleUserId) => {
    const users = require('../Fixtures/users.json');
    const usersList = users.list;
    const usersById = users.byId;
    const userIndex = usersById[toggleUserId];
    usersList[userIndex].following = !usersList[userIndex].following;
    return {
      ok: true,
    };
  },
  getPosts: (offset, limit) => {
    const allData = require('../Fixtures/posts.json').list;

    const users = require('../Fixtures/users.json');
    const usersList = users.list;
    const usersById = users.byId;
    let filteredData = allData.filter((post) => {
      const userIndex = usersById[post.recipientId];
      const show = usersList[userIndex] ? usersList[userIndex].following : false;
      return show;
    });
    if (filteredData.length == 0) {
      filteredData = allData;
    }

    const partialData = filteredData.slice(offset, offset + limit);
    const partialById = {};
    for (let i = 0; i < partialData.length; i++) {
      const datum = partialData[i];
      partialById[datum.id] = offset + i;
    }
    // hack: we need only a slice of this information
    // but we can't slice a dictionary
    return {
      ok: true,
      data: {
        list: partialData,
        // need this to display the post header in commentsScreen
        byId: partialById,
        nextOffset: offset + partialData.length,
      },
    };
  },
  getComments: (postId, offset, limit) => {
    let allData;
    if (postId == 1) {
      allData = require('../Fixtures/commentsVictor.json').list;
    } else if (postId == 2) {
      allData = require('../Fixtures/commentsJohn.json').list;
    } else {
      allData = [];
    }
    const partialData = allData.slice(offset, offset + limit);
    return {
      ok: true,
      data: {
        list: partialData,
        nextOffset: offset + partialData.length,
        // totalComments: allData.length
      },
    };
  },
  postComment: (postId, commentAuthor, commentText) => {
    // Require caches the object so the fixture mimics the actual API behavior of having multiple comments
    // https://stackoverflow.com/questions/8887318/understanding-node-js-modules-multiple-requires-return-the-same-object
    let list;
    if (postId == 1) {
      list = require('../Fixtures/commentsVictor.json').list;
    } else if (postId == 2) {
      list = require('../Fixtures/commentsJohn.json').list;
    } else {
      // Only comments to Victor or John (first two posts) will actually save.
      list = [];
    }

    const commentId = list.length + 1;
    list.push({ id: commentId, author: commentAuthor, text: commentText });
    return {
      ok: true,
    };
  },
  getPseudonym: (postId) => {
    let list;
    if (postId == 1) {
      list = require('../Fixtures/commentsVictor.json').list;
    } else if (postId == 2) {
      list = require('../Fixtures/commentsJohn.json').list;
    } else {
      // Only comments to Victor or John (first two posts) will actually save.
      list = [];
    }
    const set = new Set();
    for (const comment of list) {
      set.add(comment.author);
    }
    return {
      ok: true,
      pseudonym: `User ${set.size + 1}`,
    };
  },
  doLogin: (email, password) => {
    const validOne = email === 'vlin@nextjump.com' && password === '123qwe---';
    const validTwo = email === 'a' && password === 'a';
    if (validOne || validTwo) {
      return {
        ok: true,
        token: 'faketoken',
      };
    }
    return {
      ok: false,
    };
  },
};
