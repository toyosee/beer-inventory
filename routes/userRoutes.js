// userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authenticator = require('../middleware/authMiddleware')


router.post('/login', loginUser);

//router.use(authenticator)
router.get('/', getUsers)
router.get('/current',authenticator, currentUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)
router.post('/register', registerUser)



//router.get('/secure-route', authMiddleware, secureRoute);

module.exports = router;

// userRoutes.js
// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, currentUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
// const authenticator = require('../middleware/authMiddleware');

// // Role-based access control middleware
// // function isSuperAdmin(req, res, next) {
// //   // Check if the user has the 'Super Admin' role
// //   if (req.user && req.user.role === 'Super Admin') {
// //     next(); // User is a super admin, allow access
// //   } else {
// //     res.status(403).json({ message: 'Permission denied' });
// //   }
// // }

// // function isAdmin(req, res, next) {
// //   // Check if the user has the 'Admin' role
// //   if (req.user && req.user.role === 'Admin') {
// //     next(); // User is an admin, allow access
// //   } else {
// //     res.status(403).json({ message: 'Permission denied' });
// //   }
// // }

// // function isBasicUser(req, res, next) {
// //   // Check if the user has the 'Basic User' role
// //   if (req.user && req.user.role === 'Basic User') {
// //     next(); // User is a basic user, allow access
// //   } else {
// //     res.status(403).json({ message: 'Permission denied' });
// //   }
// // }

// router.post('/login', loginUser);

// // Public route: Registration (only accessible to 'Super Admin')
// router.post('/register', registerUser);

// // Protected routes with role-based access control
// //router.use(authenticator); // Apply authentication middleware to all routes below

// // Super Admin route: Get current user (requires 'Super Admin' role)
// router.get('/current', currentUser);

// // Super Admin route: Get all users, create user (requires 'Super Admin' role)
// router.route('/').get( getUsers).post( registerUser);

// // Super Admin route: Get user by ID, update user, delete user (requires 'Super Admin' role)
// router.route('/:id').get(getUserById).put( updateUser).delete(deleteUser);

// // Admin route: Get current user (requires 'Admin' role)
// router.get('/admin', currentUser);

// // Admin route: Get user by ID (requires 'Admin' role)
// router.get('/admin/:id', getUserById);

// // Basic User route: Get current user (requires 'Basic User' role)
// router.get('/basic',  currentUser);

// module.exports = router;
