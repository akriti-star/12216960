const { createShortLink, getStats } = require('../services/url.service');
const Log = require('../../LoggingMiddleware');

async function createShortUrl(req, res) {
  try {
    const { url, validity, shortcode } = req.body;
    const result = await createShortLink(url, validity, shortcode);
    Log('backend', 'info', 'controller', `Shortlink created: ${result.shortLink}`);
    res.status(201).json(result);
  } catch (err) {
    Log('backend', 'error', 'controller', err.message);
    res.status(400).json({ error: err.message });
  }
}

async function getShortUrlStats(req, res) {
  try {
    const shortcode = req.params.shortcode;
    const stats = await getStats(shortcode);
    Log('backend', 'info', 'controller', `Stats fetched for: ${shortcode}`);
    res.status(200).json(stats);
  } catch (err) {
    Log('backend', 'error', 'controller', err.message);
    res.status(404).json({ error: err.message });
  }
}

module.exports = { createShortUrl, getShortUrlStats };
