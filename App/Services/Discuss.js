const create = (baseURL) => {
  // const getStream = (offset, limit, token) => {
  const getPosts = (offset, limit, token) => {
    const url = `${baseURL}/v1/app/discuss/stream?Offset=${offset}&Limit=${limit}`;
    const settings = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const r = new Request(
      url,
      settings,
    );
    const response = fetch(r).then(resp => resp.json());
    return response;
  };

  // const getUserFollowList = (offset, limit, searchText, token) => {
  const getUsers = (offset, limit, searchText, token) => {
    const url = `${baseURL}/v1/app/discuss/userfollowlist?Offset=${offset}&Limit=${limit}`;
    const payload = {
      searchText,
    };
    const settings = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const r = new Request(
      url,
      settings,
    );
    const response = fetch(r).then(resp => resp.json());
    return response;
  };

  // const toggleFollow = (followeeId, token) => {
  const toggleFollowUser = (followeeId, token) => {
    const url = `${baseURL}/v1/app/discuss/togglefollow`;
    const payload = {
      followeeId,
    };
    const settings = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const r = new Request(
      url,
      settings,
    );
    const response = fetch(r).then(resp => resp.json());
    return response;
  };

  const getPseudonym = (responseId, token) => {
    // to-do: currently, this endpoint auto-increments based on pseudonyms
    // from any response, redesign later
    const url = `${baseURL}/v1/app/discuss/pseudonym/${responseId}`;
    const settings = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const r = new Request(
      url,
      settings,
    );
    const response = fetch(r).then(resp => resp.json());
    return response;
  };

  // To-do: Fix the fixture so we don't have to do something ridiculous like
  // take in a param we don't need
  // const addComment = (responseId, _, commentText, token) => {
  const postComment = (responseId, _, commentText, token) => {
    const url = `${baseURL}/v1/app/discuss/addcomment`;
    const payload = {
      commentText,
      responseId,
    };
    const settings = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const r = new Request(
      url,
      settings,
    );
    const response = fetch(r).then(resp => resp.json());
    return response;
  };

  const getComments = (responseId, offset, limit, token) => {
    const url = `${baseURL}/v1/app/discuss/comments/${responseId}?Offset=${offset}&Limit=${limit}`;
    const settings = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const r = new Request(
      url,
      settings,
    );
    const response = fetch(r).then(resp => resp.json());
    return response;
  };

  //To-do: come back and modify this for app_name and app_version
  const doLogin = (email, password, orgId) => {
    const payload = {
      grant_type: 'client_credentials',
      client_id: email,
      client_secret: password,
      app_name: 'Feedback',
      app_version: '0.0.1',
      org_id: 1,
    };
    if (orgId) {
      payload.org_id = orgId;
    }
    const r = new Request(
      `${baseURL}/v2/app/auth/token`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    );
    const response = fetch(r).then(resp => resp.json());
    return response;
  };

  return {
    // getStream,
    getPosts,
    // getUserFollowList,
    getUsers,
    // toggleFollow,
    toggleFollowUser,
    getPseudonym,
    // addComment,
    postComment,
    getComments,
    doLogin,
  };
};

export default { create };
