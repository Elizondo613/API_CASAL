const mongoose = require('mongoose');

const mimicaSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'mimica',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Mimica', mimicaSchema);