import { API_GITHUB_TOKEN } from "../../config";

export const location = (history, uri) => {
  let path = `/${uri}`;
  history.push(path);
};

export const getData = async url => {
  const response = await fetch(`${url}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json;charset=UTF-8",
      ...(API_GITHUB_TOKEN ? { Authorization: `token ${API_GITHUB_TOKEN}` } : {}),
    },
  });

  const returnedData = {
    status: response.status,
    ok: response.ok
  };

  returnedData.data = await response.json();
  
  return returnedData;
};

export const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
