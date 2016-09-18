import * as http from 'axios';

const LOGIN_ERR_MSG = `
  The username or password you have entered is invalid.
`;

const redditURL = 'https://www.reddit.com/r/programming.json';

export function getRedditDomains() {
  return new Promise((resolve, reject) => {

    http.get(redditURL)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(new Error(LOGIN_ERR_MSG));
      });
  });
}
