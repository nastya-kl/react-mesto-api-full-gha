// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://mesto.nastya-kll.nomoreparties.sbs',
  'https://mesto.nastya-kll.nomoreparties.sbs',
];

// eslint-disable-next-line consistent-return
const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};

module.exports = { cors };
