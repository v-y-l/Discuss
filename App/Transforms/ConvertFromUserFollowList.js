export default (response, offset) => {
    let list = [];
    for (let rawDatum of response.Data) {
    	let transDatum = {
			"id": rawDatum.FolloweeId,
			"firstName": rawDatum.FolloweeFirstName, 
			"lastName": rawDatum.FolloweeLastName, 
			"fullName": rawDatum.FolloweeFullName, 
			"following": rawDatum.Follows
    	};
    	list.push(transDatum);
    }

    return {
      ok: true,
      data: { 
        list: list,
        nextOffset: offset + list.length
      }
    }
}
