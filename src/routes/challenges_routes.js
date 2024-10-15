const express = require('express');
const router = express.Router();
const { getRandomTrivia } = require('../controllers/trivia_controller');
const { getRandomRiddle } = require('../controllers/riddle_controller');
const { getRandomImage } = require('../controllers/Image_controller');
const { getRandomRetoLeyenda } = require('../controllers/retoLeyenda_controller');

router.get('/random/:type', async (req, res) => {
  try {
    const tipoReto = req.params.type;
    let reto;

    switch (tipoReto) {
      case 'trivia':
        reto = await getRandomTrivia();
        break;
      case 'riddle':
        reto = await getRandomRiddle();
        break;
      case 'imagen':
        reto = await getRandomImage();
        break;
      case 'reto':
        reto = await getRandomRetoLeyenda();
        break;
      default:
        return res.status(400).json({ message: 'Tipo de reto no válido' });
    }

    if (!reto) {
      return res.status(404).json({ message: 'No se encontró ningún reto de este tipo' });
    }

    res.json(reto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el reto', error: error.message });
  }
});

module.exports = router;