// userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authenticator = require('../middleware/authMiddleware')


router.post('/login', loginUser);
router.post('/register', registerUser)

//router.use(authenticator)
router.get('/', getUsers)
router.get('/current',currentUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)



//router.get('/secure-route', authMiddleware, secureRoute);

module.exports = router;
