const bugController = require('../controllers/bug');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const { Router } = require('express');
const { isAuthenticated } = require('../middleware');

const router = Router();

router.get('/profile', isAuthenticated, userController.profile);

router.post('/register', userController.register);

router.post('/login', authController.login);

router.delete('/user', isAuthenticated, userController.deleteUser,bugController.deleteAllBugs);

router.get('/bugs', isAuthenticated, bugController.getAll);

router.post('/bug', isAuthenticated, bugController.reportNewBug);

router.delete('/bug', isAuthenticated, bugController.deleteBug);

router.put('/bug', isAuthenticated, bugController.updateBug);

module.exports = router;