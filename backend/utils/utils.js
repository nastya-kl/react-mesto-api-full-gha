const { NODE_ENV, JWT_SECRET } = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const PORT = 3000;
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URL,
};
