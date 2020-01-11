const controller = require('../controllers/metadata');
const app = module.exports = require('express')();

// Get all metadata about a word
app.get('/:word', (req, res, next) => {
  try {
    const metadata = controller.getMetadata(req.params)
    res.status(200).send(metadata);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      source: 'METADATA',
      code: 'ROUTE ERR CATCHBLOCK',
      additionalInfo: err.message
    });
  }
});