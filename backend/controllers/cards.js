const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error;
const { CastError } = mongoose.Error;
const Card = require('../modules/card');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;

  Card.findById(cardId)
    .orFail(() => new NotFound('Карточка с указанным id не найдена'))
    .then((card) => {
      if (!card.owner.equals(ownerId)) {
        next(new Forbidden('Невозможно удалить карточку, созданную другим пользователем'));
      }
      return Card.deleteOne(card)
        .then(() => res.send({ message: `Карточка ${card.name} удалена` }));
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Переданы некорректные данные для удаления карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const userID = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userID } },
    { new: true },
  )
    .orFail(() => new NotFound('Карточка с указанным id не найдена'))
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const userID = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userID } },
    { new: true },
  )
    .orFail(() => new NotFound('Карточка с указанным id не найдена'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest('Переданы некорректные данные для снятия лайка'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
