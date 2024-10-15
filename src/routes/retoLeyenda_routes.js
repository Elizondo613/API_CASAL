const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/retoLeyenda_controller');

router.get('/challenge/reto', challengeController.getRandomReto);

module.exports = router;