const request = require('request');
const wordsAPIKey = require('../middleware/secret/wordAPIKey.json').key;

const methods = {};

module.exports = methods;

/**
 * Gets the generic metadata about the provided word.
 * 
 * @param {Object} body
 * @returns {Object}
 */
methods.getMetadata = (word, callback) => {
  const options = {
    method: 'GET',
    url: 'https://wordsapiv1.p.rapidapi.com/words/' + word,
    json: true,
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': wordsAPIKey
    }
  };
  request(options, function (err, httpBody, body) {
    if(err) {
      callback(err, null, httpBody.statusCode);
    } else if (httpBody.statusCode !== 200) {
      callback('no data found for word: ' + word, null, httpBody.statusCode);
    } else {
      callback(null, body, httpBody.statusCode);
    }
  });
}