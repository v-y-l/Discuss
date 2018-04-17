import { Platform } from 'react-native';

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
	}

	const toggleFollow = ()

	return {
		getStream,
		getUserFollowList,
	}
}