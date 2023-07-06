const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getLoggedUser,
} = require('../controllers/users');

const {
  userIdValidation,
  userProfileInfoValidation,
  userAvatarValidation,
} = require('../utils/validation');

router.get('/', getUsers);
router.get('/me', getLoggedUser);
router.get('/:id', userIdValidation, getUserById);
router.patch('/me', userProfileInfoValidation, updateProfile);
router.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = router;
