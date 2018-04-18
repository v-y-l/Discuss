const ConvertFromUserFollowList = (response, offset) => {
    let list = [];
    if (response.Data) {
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
    }

    return {
      ok: true,
      data: { 
        list: list,
        nextOffset: offset + list.length
      }
    }
}

const ConvertFromToggleFollow = (response) => {
  return {
    ok: true,
  }
}

const ConvertFromGetStream = (response, offset) => {
    let list = [];
    for (let rawDatum of response.Data) {
      let transDatum = {
        "id" : rawDatum.ResponseId,
        "recipientFirstName" : rawDatum.RecipientFirstName,
        "recipientLastName" : rawDatum.RecipientLastName,
        "recipientFullName" : rawDatum.RecipientFullName,
        "recipientId" : rawDatum.RecipientId,
        "feedback" : rawDatum.Feedback,
        "rating" : rawDatum.Rating,
        "numComments" : rawDatum.NumComments
      };
      list.push(transDatum);
    }    

    let partialById = {}
    for (let i = 0; i < list.length; i++) {
      let datum = list[i]
      partialById[datum.id] = offset + i
    } 

    return {
      ok: true,
      data: {
        list: list,
        //need this to display the post header in commentsScreen
        byId: partialById, 
        nextOffset: offset + list.length,
      }
    };

}

const ConvertFromGetPseudonym = (response) => {
  let pseudonymId = response.Data.PseudonymId;
  return {
    ok: true,
    pseudonym: `User ${pseudonymId}`
  }
}

const ConvertFromAddComment = (response) => {
  return {
    ok: true,
  }
}

const ConvertFromGetComments = (response, offset) => {

    let list = [];

    if (response.Data) {
      for (let rawDatum of response.Data) {
        let transDatum = {
          "id" : rawDatum.CommentId,
          "author" : rawDatum.Author,
          "text": rawDatum.Text ,
        };
        list.push(transDatum);
      }
    }


    return {
      ok: true,
      data: {
        list: list,
        nextOffset: offset + list.length,
      }
    }
}

export {
  ConvertFromUserFollowList,
  ConvertFromToggleFollow,
  ConvertFromGetStream,
  ConvertFromGetPseudonym,
  ConvertFromAddComment,
  ConvertFromGetComments,
};