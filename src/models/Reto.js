const mongoose = require('mongoose');

const retoSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Reto', retoSchema);