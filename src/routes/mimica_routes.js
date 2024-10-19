const express = require('express');
const router = express.Router();
const mimicaController = require('../controllers/mimica_controller');

router.get('/challenge/mimica', mimicaController.getRandomMimica);

module.exports = router;