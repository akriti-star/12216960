const { nanoid } = require('nanoid');
const { saveShortUrl, getShortUrl, shortcodeExists } = require('../models/shorturl.model');

function createShortLink(url, validity = 30, shortcode = '') {
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL');
  }

  let code = shortcode || nanoid(6);
  if (shortcodeExists(code)) throw new Error('Shortcode already exists');

  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + validity * 60000);

  const shortData = {
    url,
    createdAt,
    expiresAt,
    clicks: []
  };

  saveShortUrl(code, shortData);

  return {
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiresAt.toISOString()
  };
}

function getStats(code) {
  const data = getShortUrl(code);
  if (!data) throw new Error('Shortlink not found');

  return {
    originalURL: data.url,
    createdAt: data.createdAt.toISOString(),
    expiry: data.expiresAt.toISOString(),
    totalClicks: data.clicks.length,
    clicks: data.clicks
  };
}

module.exports = { createShortLink, getStats };
