const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error;
const { CastError } = mongoose.Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modules/user');
const { SECRET_KEY } = require('../utils/utils');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(201).send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании профиля'));
      } else if (err.code === 11000) {
        next(new Conflict('Пользователь с таким Email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

// Поиск пользователя по ID
const findUserById = (req, res, next, userId) => {
  User.findById(userId)
    .orFail(() => new NotFound('Пользователь с таким id не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Введён некорректный id'));
      } else {
        next(err);
      }
    });
};

const getUserById = (req, res, next) => {
  const userId = req.params.id;
  findUserById(req, res, next, userId);
};

const getLoggedUser = (req, res, next) => {
  const userId = req.user._id;
  findUserById(req, res, next, userId);
};

// Изменение данных пользоателя по ID
const changeUserInfo = (req, res, next, data) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  })
    .orFail(() => new NotFound('Пользователь с таким id не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  changeUserInfo(req, res, next, { name, about });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  changeUserInfo(req, res, next, { avatar });
};

// Авторизованный пользователь
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getLoggedUser,
};
