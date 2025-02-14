require('dotenv').config();
const mongoose = require('mongoose');
const Mimica = require('../models/Mimica');
const Image = require('../models/Image');
const Riddle = require('../models/Riddle');
const Trivia = require('../models/Trivia');
const Reto = require('../models/Reto');

// Conexión a MongoDB
async function updateData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Función para actualizar una colección
    const updateCollection = async (Model, modelName) => {
      try {
        const result = await Model.updateMany(
          { active: { $exists: false } }, // Filtra documentos sin el atributo "active"
          { $set: { active: true } }     // Agrega el atributo "active" con valor "true"
        );
        console.log(`Actualizados ${result.modifiedCount} documentos en la colección ${modelName}`);
      } catch (error) {
        console.error(`Error al actualizar la colección ${modelName}:`, error);
      }
    };

    // Actualizar todas las colecciones
    await updateCollection(Mimica, 'Mimica');
    await updateCollection(Image, 'Image');
    await updateCollection(Riddle, 'Riddle');
    await updateCollection(Trivia, 'Trivia');
    await updateCollection(Reto, 'Reto');

    console.log('Todos los documentos han sido actualizados');
  } catch (error) {
    console.error('Error al conectar o actualizar datos:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Desconectado de MongoDB');
  }
}

updateData();