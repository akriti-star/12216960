const urlDatabase = {};

function saveShortUrl(code, data) {
  urlDatabase[code] = data;
}

function getShortUrl(code) {
  return urlDatabase[code];
}

function shortcodeExists(code) {
  return urlDatabase.hasOwnProperty(code);
}

module.exports = { saveShortUrl, getShortUrl, shortcodeExists };
