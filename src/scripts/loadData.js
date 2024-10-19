require('dotenv').config();
const mongoose = require('mongoose');
const Mimica = require('../models/Mimica');

const mimicas = [
  {
    text: "Tejer un huipil tradicional",
    category: "mim"
  },
  {
    text: "Correr de noche",
    category: "mim"
  },
  {
    text: "Cocinar tortillas a mano",
    category: "mim"
  },
  {
    text: "Nadar en el mar",
    category: "mim"
  },
  {
    text: "Tocar la marimba",
    category: "mim"
  },
  {
    text: "Leer un libro de terror",
    category: "mim"
  },
  {
    text: "Bailar el meneadito",
    category: "mim"
  },
  {
    text: "Cepillarse los dientes",
    category: "mim"
  },
  {
    text: "Ecalar el volcán",
    category: "mim"
  },
  {
    text: "Jugar tenis",
    category: "mim"
  },
  {
    text: "Hacer una llamada telefónica",
    category: "mim"
  },
  {
    text: "Preparar el almuerzo",
    category: "mim"
  },
  {
    text: "Pintar un cuadro",
    category: "mim"
  },
  {
    text: "Volar una cometa",
    category: "mim"
  },
  {
    text: "Colocar un cuadro en la pared",
    category: "mim"
  },
  {
    text: "Conducir un automóvil",
    category: "mim"
  },
  {
    text: "Jugar fútbol",
    category: "mim"
  },
  {
    text: "Tirar un petate al piso",
    category: "mim"
  },
  {
    text: "Planchar ropa",
    category: "mim"
  },
  {
    text: "Navegar una canoa en el lago de Atitlán",
    category: "mim"
  },
  {
    text: "Tomar una fotografía",
    category: "mim"
  },
  {
    text: "Preparar una tortilla con chicharron",
    category: "mim"
  },
  {
    text: "Montar a caballo",
    category: "mim"
  },
  {
    text: "Tocar la guitarra",
    category: "mim"
  },
  {
    text: "Hacer un volcancito de tierra",
    category: "mim"
  },
  {
    text: "Hacer ejercicio en el gimnasio",
    category: "mim"
  },
  {
    text: "Pescar",
    category: "mim"
  },
  {
    text: "Disfrazarte del sombreron",
    category: "mim"
  },
  {
    text: "Escribir una carta",
    category: "mim"
  },
  {
    text: "Cortar café en una finca",
    category: "mim"
  },
  {
    text: "Jugar baloncesto",
    category: "mim"
  },
  {
    text: "Coser un vestido",
    category: "mim"
  },
  {
    text: "Preparar tamales",
    category: "mim"
  },
  {
    text: "Esquiar",
    category: "mim"
  },
  {
    text: "Bailar salsa",
    category: "mim"
  },
  {
    text: "Hacer un plato de barro",
    category: "mim"
  },
  {
    text: "Cocinar huevos estrellados",
    category: "mim"
  },
  {
    text: "Jugar voleibol",
    category: "mim"
  },
  {
    text: "Tejer un vestido de 15 años",
    category: "mim"
  },
  {
    text: "Maquillarse como payaso",
    category: "mim"
  },
  {
    text: "Regatear en un mercado local",
    category: "mim"
  },
  {
    text: "Caminar por la cuerda floja",
    category: "mim"
  },
  {
    text: "Jugar golf",
    category: "mim"
  },
  {
    text: "Hacer una entrega en moto",
    category: "mim"
  },
  {
    text: "Plantar un árbol",
    category: "mim"
  },
  {
    text: "Tocar el piano",
    category: "mim"
  },
  {
    text: "Ser un turista en Semana Santa",
    category: "mim"
  },
  {
    text: "Hacer malabares",
    category: "mim"
  },
  {
    text: "Practicar yoga",
    category: "mim"
  },
  {
    text: "Tallar una estela maya",
    category: "mim"
  },
  {
    text: "Surfear",
    category: "mim"
  },
  {
    text: "Jugar ajedrez",
    category: "mim"
  },
  {
    text: "Tiro al blanco en la feria",
    category: "mim"
  },
  {
    text: "Cortar el pelo",
    category: "mim"
  },
  {
    text: "Jugar béisbol",
    category: "mim"
  },
  {
    text: "Comprar un morral típico",
    category: "mim"
  },
  {
    text: "Escalar una montaña",
    category: "mim"
  },
  {
    text: "Bailar breakdance",
    category: "mim"
  },
  {
    text: "Preparar fiambre (plato festivo)",
    category: "mim"
  },
  {
    text: "Patinar sobre hielo",
    category: "mim"
  },
  {
    text: "Jugar ping pong",
    category: "mim"
  },
  {
    text: "Pedir unas pupusas en el parque",
    category: "mim"
  },
  {
    text: "Lavar un automóvil",
    category: "mim"
  },
  {
    text: "Tocar en violín la luna de Xelajú",
    category: "mim"
  },
  {
    text: "Hacer como pescado",
    category: "mim"
  },
  {
    text: "Hacer paracaidismo",
    category: "mim"
  },
  {
    text: "Jugar bolos",
    category: "mim"
  },
  {
    text: "Celebrar el año nuevo",
    category: "mim"
  },
  {
    text: "Arreglar una bicicleta",
    category: "mim"
  },
  {
    text: "Jugar canicas",
    category: "mim"
  },
  {
    text: "Acariciar al gato",
    category: "mim"
  },
  {
    text: "Bucear",
    category: "mim"
  },
  {
    text: "Jugar damas",
    category: "mim"
  },
  {
    text: "Usar una máscara de danza guatemalteca",
    category: "mim"
  },
  {
    text: "Practicar karate",
    category: "mim"
  },
  {
    text: "Tocar la trompeta",
    category: "mim"
  },
  {
    text: "Arreglar el árbol de navidad",
    category: "mim"
  },
  {
    text: "Jugar al billar",
    category: "mim"
  },
  {
    text: "Hacer origami",
    category: "mim"
  },
  {
    text: "Tallar una figura de madera",
    category: "mim"
  },
  {
    text: "Jugar rugby",
    category: "mim"
  },
  {
    text: "Tocar el saxofón",
    category: "mim"
  },
  {
    text: "Correr la antorha de septiembre",
    category: "mim"
  },
  {
    text: "Practicar tiro con arco",
    category: "mim"
  },
  {
    text: "Jugar dominó",
    category: "mim"
  },
  {
    text: "Hacer una piñata",
    category: "mim"
  },
  {
    text: "Practicar esgrima",
    category: "mim"
  },
  {
    text: "Tocar la bateria",
    category: "mim"
  },
  {
    text: "El gol del pin plata a Brasil",
    category: "mim"
  },
  {
    text: "La impresora no funciona",
    category: "mim"
  },
  {
    text: "Regatear aguacates en el mercado",
    category: "mim"
  },
  {
    text: "Cantar como Bad Bunny",
    category: "mim"
  },
  {
    text: "Practicar boxeo",
    category: "mim"
  },
  {
    text: "Tocar el arpa",
    category: "mim"
  },
  {
    text: "Entrar comida al cine",
    category: "mim"
  },
  {
    text: "Jugar waterpolo",
    category: "mim"
  },
  {
    text: "Hacerte un tatuaje",
    category: "mim"
  },
  {
    text: "Preparar chuchitos",
    category: "mim"
  },
  {
    text: "Practicar lanzamiento de jabalina",
    category: "mim"
  },
  {
    text: "Comer un elote loco",
    category: "mim"
  },
];

async function loadData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Cargar mimicas
    await Mimica.deleteMany({});
    const mimicaResult = await Mimica.insertMany(mimicas);
    console.log(`${mimicaResult.length} mimicas cargados exitosamente`);

  } catch (error) {
    console.error('Error al cargar datos:', error);
  } finally {
    await mongoose.connection.close();
  }
}

loadData();