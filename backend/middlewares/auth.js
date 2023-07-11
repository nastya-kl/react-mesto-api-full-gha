const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/utils');
const Unauthorized = require('../errors/Unauthorized');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new Unauthorized('Необходимо авторизоваться'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new Unauthorized('Необходимо авторизоваться'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = { auth };
