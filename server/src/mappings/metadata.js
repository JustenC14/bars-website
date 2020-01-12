const errorHandler = require('./error');
const methods = {};

module.exports = methods;

/**
 * Handles converting the generic WordsAPI full result
 * into a simpler version
 * 
 * @param {Object} body the WordsAPI response
 * @returns {Object}
 */
methods.mapMetadataResponseSimple = (body) => {
  try { 
    return {
      word: body.word,
      results: generateSimpleResultsObject(body.results),
      syllables: body.syllables.list,
      pronunciation: body.pronunciation
    };
  } catch (err) {
    console.log(err);
    const source = 'mappings:metadata:simple';
    const message = (typeof(err) === 'string') ? err : 'encountered exception while generating response';
    return errorHandler.genericErrorResponseHandler(source, message);
  }
}

// BEGIN: Metadata transforming internal functions

/**
 * Converts the full array of results objects from WordAPI
 * into a simpler form
 * 
 * @param {Array} results WordsAPI full results array
 * @returns {Array}
 */
function generateSimpleResultsObject(results) {
  try {
      let simplifiedResults = [];
      results.forEach(function (result) {
        simplifiedResults.push({
          definition: result.definition,
          partOfSpeech: result.partOfSpeech
        });
      })
      return simplifiedResults;
    } catch (err) {
      console.log(err);
      throw new Error('encountered error while simplifying results object');
    }
}