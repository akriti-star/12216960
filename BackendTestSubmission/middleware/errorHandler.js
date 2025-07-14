const Log = require('../../LoggingMiddleware');

function errorHandler(err, req, res, next) {
  Log('backend', 'error', 'middleware', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;
