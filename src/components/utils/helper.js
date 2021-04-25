export const location = (history, uri) => {
  let path = `/${uri}`;
  history.push(path);
};

export const getData = async url => {
  const res = await fetch(`${url}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "token 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",
    },
  })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(e => {
      console.log("getData error", e);
    });

  return await res.json();
};
