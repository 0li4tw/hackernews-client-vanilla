export function httpGet(url, params = {}) {
  url = generateUrlWithQueryString(url, params);

  return fetch(url, {
    mode: "cors"
  }).then(response => response.json());
}

function generateUrlWithQueryString(url, params) {
  return url + createQueryString(params);
}

function createQueryString(params) {
  let queryString = "";
  let first = true;

  for (let param in params) {
    if (params.hasOwnProperty(param)) {
      queryString += `${first ? "?" : "&"}${param}=${params[param]}`;
      first = false;
    }
  }

  return queryString;
}
