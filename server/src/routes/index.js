const app = module.exports = require('express').Router();

// Test Route
app.get('/info', (req, res, next) => {
  console.log('Test route executed');
  res.status(202).send({'message': 'Hey, you called?'});
});
app.use('/metadata', require('./metadata'));
app.use('/syllables', require('./syllables'));
app.use('/pronunciation', require('./pronunciation'));