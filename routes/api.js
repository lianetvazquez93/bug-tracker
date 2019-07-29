const apiController = require('../controllers/api');
const authController = require('../controllers/auth');
const { Router } = require('express');

const router = Router();

router.post('/login', authController.login);

router.get('/bugs', apiController.getAll);

router.get('/bug/:id', apiController.getById);

router.post('/bug', apiController.reportNewBug);

router.delete('/bug', apiController.deleteBug);

router.put('/bug', apiController.updateBug);

module.exports = router;