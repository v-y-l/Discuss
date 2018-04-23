const ConvertFromUserFollowList = (response, offset) => {
  const list = [];
  if (response.Data) {
    for (const rawDatum of response.Data) {
      const transDatum = {
        id: rawDatum.FolloweeId,
        firstName: rawDatum.FolloweeFirstName,
        lastName: rawDatum.FolloweeLastName,
        fullName: rawDatum.FolloweeFullName,
        following: rawDatum.Follows,
      };
      list.push(transDatum);
    }
  }

  return {
    ok: true,
    data: {
      list,
      nextOffset: offset + list.length,
    },
  };
};

const ConvertFromToggleFollow = response => ({
  ok: true,
});

const ConvertFromGetStream = (response, offset) => {
  const list = [];
  for (const rawDatum of response.Data) {
    const transDatum = {
      id: rawDatum.ResponseId,
      recipientFirstName: rawDatum.RecipientFirstName,
      recipientLastName: rawDatum.RecipientLastName,
      recipientFullName: rawDatum.RecipientFullName,
      recipientId: rawDatum.RecipientId,
      feedback: rawDatum.Feedback,
      rating: rawDatum.Rating,
      numComments: rawDatum.NumComments,
    };
    list.push(transDatum);
  }

  const partialById = {};
  for (let i = 0; i < list.length; i++) {
    const datum = list[i];
    partialById[datum.id] = offset + i;
  }

  return {
    ok: true,
    data: {
      list,
      // need this to display the post header in commentsScreen
      byId: partialById,
      nextOffset: offset + list.length,
    },
  };
};

const ConvertFromGetPseudonym = (response) => {
  const pseudonymId = response.Data.PseudonymId;
  return {
    ok: true,
    pseudonym: `User ${pseudonymId}`,
  };
};

const ConvertFromAddComment = response => ({
  ok: true,
});

const ConvertFromGetComments = (response, offset) => {
  const list = [];

  if (response.Data) {
    for (const rawDatum of response.Data) {
      const transDatum = {
        id: rawDatum.CommentId,
        author: rawDatum.Author,
        text: rawDatum.Text,
      };
      list.push(transDatum);
    }
  }


  return {
    ok: true,
    data: {
      list,
      nextOffset: offset + list.length,
    },
  };
};

const ConvertFromDoLogin = (response) => {
  return {
    ok: true,
    token: response.Data.access_token,
  }
}

export {
  ConvertFromUserFollowList,
  ConvertFromToggleFollow,
  ConvertFromGetStream,
  ConvertFromGetPseudonym,
  ConvertFromAddComment,
  ConvertFromGetComments,
  ConvertFromDoLogin,
};
