require('dotenv').config();
const mongoose = require('mongoose');
const Image = require('../models/Image');
const Challenge = require('../models/retoLeyenda');

const images = [
  {
    url: "../assets/Image_Llorona.png",
    description: "Invierte el orden del juego",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Sombreron.png",
    description: "El siguiente jugador pierde un turno",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Siguanaba.png",
    description: "Permite al jugador mover a otro jugador 3 casillas en cualquier dirección",
    category: "Comodin"
  },
  {
    url: "../assets/Image_CadejoB.png",
    description: "El jugador puede moverse a cualquier casilla del tablero",
    category: "Comodin"
  },
  {
    url: "../assets/Image_CadejoN.png",
    description: "Todos los demás jugadores retroceden 2 casillas",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Vanushka.png",
    description: "Toma la llave que quieras del mazo",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Juan.png",
    description: "Paga un tributo y devuelve una de las llaves al mazo",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Tatuana.png",
    description: "Quítale una llave al jugador de la izquierda",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Gigantes.png",
    description: "Te vas al volcán de fuego",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Animas.png",
    description: "Quítale una llave al  jugador de la derecha",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Win.png",
    description: "Quítale una llave al jugador de la izquierda",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Carruaje.png",
    description: "El jugador que señales pierde un turno",
    category: "Comodin"
  },
  {
    url: "../assets/Image_Tzipitios.png",
    description: "Pierdes una llave al azar",
    category: "Comodin"
  }
  // ... más imágenes
];

const challenges = [
  {
    text: "Video Narrador: Crear un video de 60 segundos narrando una leyenda de manera creativa",
    category: "Video"
  },
  {
    text: "Foto Escenario: Tomar una foto relacionada con la leyenda y explicar la conexión",
    category: "Foto"
  },
  {
    text: "Modernización: Escribir un tweet que actualice la leyenda al contexto actual",
    category: "Tweet"
  },
  {
    text: "Quiz Colaborativo: Crear una encuesta con preguntas sobre la leyenda",
    category: "Quiz"
  },
  {
    text: "Reto Artístico: Dibujar o crear un collage digital representando un elemento de la leyenda",
    category: "Dibujo"
  }
  // ... más retos
];

async function loadData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Cargar imágenes
    await Image.deleteMany({});
    const imageResult = await Image.insertMany(images);
    console.log(`${imageResult.length} imágenes cargadas exitosamente`);

    // Cargar retos
    await Challenge.deleteMany({});
    const challengeResult = await Challenge.insertMany(challenges);
    console.log(`${challengeResult.length} retos cargados exitosamente`);

  } catch (error) {
    console.error('Error al cargar datos:', error);
  } finally {
    await mongoose.connection.close();
  }
}

loadData();