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
methods.getMetadata = (params) => {
  const word = params.word

  const options = {
    method: 'GET',
    url: 'https://wordsapiv1.p.rapidapi.com/words/' + word,
    headers: {
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      'x-rapidapi-key': wordsAPIKey
    }
  };

  return request(options).body;
}