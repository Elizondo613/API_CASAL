const express = require('express');
const router = express.Router();
const imageController = require('../controllers/Image_controller');

router.get('/challenge/image', imageController.getRandomImage);

module.exports = router;