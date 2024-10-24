require('dotenv').config();
const mongoose = require('mongoose');
const Reto = require('../models/Reto');

const retos = [
  {
    text: "Haz un video contando la historia de Guatemala en 60 segundos usando solo emojis.",
    category: "TikTok"
  },
  {
    text: "Crea un transition challenge de turista normal a explorador maya.",
    category: "TikTok"
  },
  {
    text: "Haz un tutorial de cómo hacer un mole en 30 segundos (con comedia).",
    category: "TikTok"
  },
  {
    text: "Crea un video mostrando 5 lugares turísticos de Guatemala en versión miniatura (usando objetos caseros).",
    category: "TikTok"
  },
  {
    text: "Haz un dueto con un sonido tradicional guatemalteco y baila como un personaje histórico.",
    category: "TikTok"
  },
  {
    text: "Crea un video de 'expectativa vs realidad' sobre cocinar un platillo guatemalteco por primera vez.",
    category: "TikTok"
  },
  {
    text: "Haz un lip-sync con un diálogo famoso pero tradúcelo al kaqchikel (con subtítulos cómicos).",
    category: "TikTok"
  },
  {
    text: "Crea un video de transición de tu ropa normal a un traje típico guatemalteco.",
    category: "TikTok"
  },
  {
    text: "Haz un tutorial rápido de cómo dibujar un quetzal estilizado.",
    category: "TikTok"
  },
  {
    text: "Crea un video usando el efecto de cámara lenta para una 'carrera de tamales'.",
    category: "TikTok"
  },
  {
    text: "Haz un 'storytime' contando una experiencia turística épica en Guatemala en 3 partes.",
    category: "TikTok"
  },
  {
    text: "Crea un video de 'un día en la vida de' una estatua en Tikal.",
    category: "TikTok"
  },
  {
    text: "Haz un reto de baile inspirado en movimientos mayas con música electrónica.",
    category: "TikTok"
  },
  {
    text: "Crea un video ASMR con sonidos de la preparación de un textil guatemalteco.",
    category: "TikTok"
  },
  {
    text: "Haz un tour rápido y cómico por un mercado local.",
    category: "TikTok"
  },
  {
    text: "Crea un video de 'adivina la comida guatemalteca' usando solo emojis.",
    category: "TikTok"
  },
  {
    text: "Haz un video de '3 cosas que no sabías' sobre palabras guatemaltecas.",
    category: "TikTok"
  },
  {
    text: "Crea un transition challenge de turista perdido a guía experto de Guatemala.",
    category: "TikTok"
  },
  {
    text: "Haz un video reaccionando a probar comida picante guatemalteca por primera vez.",
    category: "TikTok"
  },
  {
    text: "Crea un tutorial de cómo hacer una piñata casera de un personaje de leyenda.",
    category: "TikTok"
  },
  {
    text: "Haz un video de 'encuentra al quetzal' escondido en diferentes escenas de Guatemala.",
    category: "TikTok"
  },
  {
    text: "Crea un 'day in the life' de un volcán guatemalteco.",
    category: "TikTok"
  },
  {
    text: "Haz un video comparando modismos guatemaltecos con los de otros países.",
    category: "TikTok"
  },
  {
    text: "Crea un reto de actuación interpretando diferentes personajes históricos de Guatemala en situaciones modernas.",
    category: "TikTok"
  },
  {
    text: "Haz un video de '5 datos curiosos sobre Guatemala' que parezcan falsos pero son verdaderos.",
    category: "TikTok"
  },
  {
    text: "Crea un transition challenge de ciudad moderna a antigua ciudad maya.",
    category: "TikTok"
  },
  {
    text: "Haz un video de 'sonidos de Guatemala' usando solo objetos encontrados en casa.",
    category: "TikTok"
  },
  {
    text: "Crea un tutorial de cómo hacer un tejido típico usando materiales inesperados.",
    category: "TikTok"
  },
  {
    text: "Haz un video de 'adivina la leyenda guatemalteca' usando solo mímica.",
    category: "TikTok"
  },
  {
    text: "Crea un reto de baile fusionando pasos tradicionales guatemaltecos con bailes virales de TikTok.",
    category: "TikTok"
  },
  {
    text: "Haz un video de 'transforma tu cocina' en un puesto de comida callejera guatemalteca.",
    category: "TikTok"
  },
  {
    text: "Crea un 'antes y después' de sitios famosos de Guatemala con un filtro de 'Guatemala 2100'.",
    category: "TikTok"
  },
  {
    text: "Haz un video recopilando las reacciones más divertidas de gente probando comida guatemalteca por primera vez.",
    category: "TikTok"
  },
];

async function loadData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Cargar retos
    await Reto.deleteMany({});
    const retoResult = await Reto.insertMany(retos);
    console.log(`${retoResult.length} retos cargados exitosamente`);

  } catch (error) {
    console.error('Error al cargar datos:', error);
  } finally {
    await mongoose.connection.close();
  }
}

loadData();