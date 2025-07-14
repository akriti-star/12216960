const express = require('express');
const { createShortUrl, getShortUrlStats } = require('../controllers/shorturl.controller');

const router = express.Router();

router.post('/', createShortUrl);
router.get('/:shortcode', getShortUrlStats);

module.exports = router;
