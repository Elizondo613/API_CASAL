const express = require('express');
const router = express.Router();
const retoController = require('../controllers/reto_controller');

router.get('/challenge/reto', retoController.getRandomRetoR);

module.exports = router;