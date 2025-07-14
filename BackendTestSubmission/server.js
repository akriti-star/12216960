const express = require('express');
const shortUrlRoutes = require('./routes/shorturl.routes');
const Log = require('../LoggingMiddleware');
const { getShortUrl } = require('./models/shorturl.model');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    Log('backend', 'info', 'middleware', `${req.method} ${req.url} hit`);
    next();
});

app.use('/shorturls', shortUrlRoutes);

// Redirection route for shortcodes
app.get('/:shortcode', (req, res) => {
    const code = req.params.shortcode;
    const data = getShortUrl(code);

    if (!data) {
        Log('backend', 'error', 'route', `Invalid shortcode: ${code}`);
        return res.status(404).json({ error: 'Shortlink not found' });
    }

    const now = new Date();
    if (now > data.expiresAt) {
        Log('backend', 'warn', 'route', `Shortlink expired: ${code}`);
        return res.status(410).json({ error: 'Shortlink expired' });
    }

    data.clicks.push({
        timestamp: now.toISOString(),
        referrer: req.get('Referrer') || 'unknown',
        userAgent: req.get('User-Agent') || 'unknown',
        ip: req.ip
    });

    Log('backend', 'info', 'route', `Redirecting shortcode ${code} to ${data.url}`);
    res.redirect(data.url);
});

app.use((err, req, res, next) => {
    Log('backend', 'error', 'middleware', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = 3000;
app.listen(PORT, () => {
    Log('backend', 'info', 'service', `Server started on port ${PORT}`);
    console.log(`Server running on http://localhost:${PORT}`);
});
