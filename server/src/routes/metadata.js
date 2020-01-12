const controller = require('../controllers/metadata');
const transformer = require('../mappings/metadata');
const errorMapper = require('../mappings/error')
const app = module.exports = require('express')();

// Get all metadata about a word
app.get('/:word/full', (req, res) => {
  try {
    controller.getMetadata(req.params.word, function(err, body, httpCode) {
      if (err) {
        const source = 'controller:metadata:full';
        const message = err.length > 0 ? err : 'unexpected exception encountered';
        res.status(httpCode).send(errorMapper.genericErrorResponseHandler(source, message));
      } else {
        res.status(httpCode).send(body);
      }
    });
  } catch (err) {
    console.log(err);
    const source = 'routes:metadata:full';
    const message = err.message.length > 0 ? err.message : 'unexpected exception encountered'
    res.status(500).send(errorMapper.genericErrorResponseHandler(source, message));
  }
});

// Simplified metadata about a word
app.get('/:word/simple', (req, res) => {
  try {
    controller.getMetadata(req.params.word, function(err, body, httpCode) {
      if (err) {
        const source = 'controller:metadata:simple';
        const message = err.length > 0 ? err : 'unexpected exception encountered';
        res.status(httpCode).send(errorMapper.genericErrorResponseHandler(source, message));
      } else {
        res.status(httpCode).send(transformer.mapMetadataResponseSimple(body));
      }
    });
  } catch (err) {
    console.log(err);
    const source = 'routes:metadata:simple';
    const message = err.message.length > 0 ? err.message : 'unexpected exception encountered'
    res.status(500).send(errorMapper.genericErrorResponseHandler(source, message));
  }  
});