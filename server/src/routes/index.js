const app = module.exports = require('express').Router();

// Test Path
app.get('/info', (req, res, next) => {
  console.log('Test path executed');
  res.send("Hey, you called?\n");
});