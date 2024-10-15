const mongoose = require('mongoose');

const retoLeyendaSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'reto',
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

module.exports = mongoose.model('RetoLeyenda', retoLeyendaSchema);