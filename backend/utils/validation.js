const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const regex = /https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i;

// Валидация:

// getUserById
const userIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().min(24).hex(),
  }),
});

// updateProfile
const userProfileInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// updateAvatar
const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

// login
const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// createUser
const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
});

// deleteCard, likeCard, dislikeCard
const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().min(24),
  }),
});

// createCard
const newCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regex),
  }),
});

module.exports = {
  userIdValidation,
  userProfileInfoValidation,
  userAvatarValidation,
  cardIdValidation,
  newCardValidation,
  signInValidation,
  signUpValidation,
};
