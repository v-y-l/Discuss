const create = (baseURL) => {
	const getStream = (offset, limit, token) => {
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

	const getUserFollowList = (offset, limit, searchText, token) => {
		const url = `${baseURL}/v1/app/discuss/userfollowlist?Offset=${offset}&Limit=${limit}`;
		const payload = {
			searchText
		};
		const settings = {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				Authorization: `bearer ${token}`,
			}
		};
		const r = new Request(
			url,
			settings,
		);
		const response = fetch(r).then(resp => resp.json());
		return response;
	};

	const toggleFollow = (followeeId, token) => {
		const url = `${baseURL}/v1/app/discuss/togglefollow`;
		const payload = {
			followeeId
		};
		const settings = {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				Authorization: `bearer ${token}`,
			}
		};
		const r = new Request(
			url,
			settings,
		);
		const response = fetch(r).then(resp => resp.json());
		return response;
	};

	const getPseudonym = (responseId, token) => {
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

	const addComment = (commentText, responseId, token) => {
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
			}
		};
		const r = new Request(
			url,
			settings,
		);
		const response = fetch(r).then(resp => resp.json());
		return response;
	}

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
	}

	return {
		getStream,
		getUserFollowList,
		toggleFollow,
		getPseudonym,
		addComment,
		getComments,
	};
};

export default { create };