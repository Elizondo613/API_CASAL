const express = require('express');
const router = express.Router();
const riddleController = require('../controllers/riddle_controller');

router.get('/challenge/riddle', riddleController.getRandomRiddle);

module.exports = router;