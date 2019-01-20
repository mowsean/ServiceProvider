import * as Sentry from "@sentry/browser";

/**
 * @function getCurrentUser
 * @description
 *   Fetch the current User and return a Promise that contains either the User Object or undefined
 * @return {Promise<[Object]>} The User Object | undefined
 * */
// export const getCurrentUser = () =>
//     fetchWrapper('/api/security/current-user').then(res => {
//         if (!res || !res.user) throw new Error('User not found');

//         return res.user;
//     });

// export const getAllowedLifeUsersEmailList = () =>
//     fetchWrapper('/api/sql/allowed-users').then(userEmailObjects =>
//         userEmailObjects.map(user => user.email)
//     );
/**
 * @function fetchWrapper
 * @param {string} arg1 - REST method | url
 * @param {string} [url] - url
 * @param {Object} [body] - body of message
 * @description
 *   Wrapper for the fetch api that provides options defaults and base response code handling.
 * @return {Promise<Object>} A promise containing the deserialized response object.
 * */
export const fetchWrapper = (arg1, url, body) => {
  // if called with one argument, default to 'GET' method
  const _method = url ? arg1.toUpperCase() : "GET";
  // if called without method arg, the first
  const _api = "http://localhost:3000"; // temprory

  const _url = _api + (url || arg1);
  // const _url = url || arg1;
  debugger;
  const options = {
    method: _method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache"
    },

    //     credentials: 'include', // Temporary Commented
    body: body && JSON.stringify(body) // body can be undefined, that's ok
  };

  return fetch(_url, options).then(handleResponse);
};

/**
 * @function handleResponse
 * @param {Object} response - The repsonse object.
 * @description
 *   A handler for the fetch response Object
 * @return {Promise<Object>} A promise containing the deserialized response object.
 * */
export const handleResponse = response => {
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (response.status < 200 || response.status >= 300) {
    if (process.env.REACT_APP_SENTRY_DSN) {
      Sentry.captureException(response.status);
    }

    throw new Error(
      `There has been an error. Response status: ${response.status}`
    );
  }

  return response.json();
};
