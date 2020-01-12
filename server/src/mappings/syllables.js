const errorHandler = require('./error');
const methods = {};

module.exports = methods;

methods.mapSyllablesResponse = (body) => {
  try { 
    return {
      word: body.word,
      count: body.syllables.count,
      syllables: body.syllables.list
    };
  } catch (err) {
    console.log(err);
    const source = 'mappings:syllables';
    const message = (typeof(err) === 'string') ? err : 'encountered exception while generating response';
    return errorHandler.genericErrorResponseHandler(source, message);
  }
}
