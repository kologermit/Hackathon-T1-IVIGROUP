const request = require('request');
const querystring = require('querystring');

const authHandler = async (options) => {
    if (options.query) {
        options.url += '?' + querystring.stringify(options.query);
    }
    console.log(options.url)
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        
        console.log(body)
        resolve(body); 

    });
    });
  };

async function signinRequest(id, hash) {
    const options = {
        url: 'http://auth:8080/sign-in/',
        method: 'GET',
        json: true,
        query: {
            user: id,
            hash: hash
        }
    };

    return await authHandler(options);
}

async function authRequest(id, token) {
    const options = {
        url: 'http://auth:8080/auth/',
        method: 'GET',
        json: true,
        query: {
            user: id,
            token: token
        }
    };

    return await authHandler(options);
}

async function logoutRequest(id, token) {
    const options = {
        url: 'http://auth/log-out/',
        method: 'GET',
        json: true,
        query: {
            user: id,
            token: token
        } 
    };

    return await authHandler(options);
}

module.exports = {
    authRequest,
    signinRequest,
    logoutRequest
  };