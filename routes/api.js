const apiController = require('../controllers/api');
const authController = require('../controllers/auth');
const { Router } = require('express');
const { isAuthenticated } = require('../middleware');

const router = Router();

router.post('/login', authController.login);

router.get('/bugs', isAuthenticated, apiController.getAll);

router.post('/bug', isAuthenticated, apiController.reportNewBug);

router.delete('/bug', isAuthenticated, apiController.deleteBug);

router.put('/bug', isAuthenticated, apiController.updateBug);

module.exports = router;