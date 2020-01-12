const errorHandler = require('./error');
const methods = {};

module.exports = methods;

methods.mapPronunciationResponse = (body) => {
  try { 
    return {
      word: body.word,
      pronunciation: body.pronunciation
    };
  } catch (err) {
    console.log(err);
    const source = 'mappings:pronunciation';
    const message = (typeof(err) === 'string') ? err : 'encountered exception while generating response';
    return errorHandler.genericErrorResponseHandler(source, message);
  }
}
