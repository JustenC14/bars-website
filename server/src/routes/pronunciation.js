const controller = require('../controllers/metadata');
const transformer = require('../mappings/pronunciation');
const errorMapper = require('../mappings/error')
const app = module.exports = require('express')();

// Pronunciation of a word
app.get('/:word', (req, res) => {
  try {
    controller.getMetadata(req.params.word, function(err, body, httpCode) {
      if (err) {
        const source = 'routes:pronunciation';
        const message = err.length > 0 ? err : 'unexpected exception encountered';
        res.status(httpCode).send(errorMapper.genericErrorResponseHandler(source, message));
      } else {
        res.status(httpCode).send(transformer.mapPronunciationResponse(body));
      }
    });
  } catch (err) {
    console.log(err);
    const source = 'routes:pronunciation';
    const message = err.message.length > 0 ? err.message : 'unexpected exception encountered'
    res.status(500).send(errorMapper.genericErrorResponseHandler(source, message));    
  }
})