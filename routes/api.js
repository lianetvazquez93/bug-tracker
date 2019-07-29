const apiController = require('../controllers/api');
const authController = require('../controllers/auth');
const { Router } = require('express');
const { isAuthenticated } = require('../middleware');

const router = Router();

router.post('/login', authController.login);

router.get('/bugs', isAuthenticated, apiController.getAll);

router.get('/bug/:id', apiController.getById);

router.post('/bug', isAuthenticated, apiController.reportNewBug);

router.delete('/bug', apiController.deleteBug);

router.put('/bug', apiController.updateBug);

module.exports = router;