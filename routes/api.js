const apiController = require('../controllers/api');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const { Router } = require('express');
const { isAuthenticated } = require('../middleware');

const router = Router();

router.get('/profile', isAuthenticated, userController.profile);

router.post('/register', userController.register);

router.post('/login', authController.login);

router.delete('/user', isAuthenticated, userController.deleteUser);

router.get('/bugs', isAuthenticated, apiController.getAll);

router.post('/bug', isAuthenticated, apiController.reportNewBug);

router.delete('/bug', isAuthenticated, apiController.deleteBug);

router.put('/bug', isAuthenticated, apiController.updateBug);

module.exports = router;