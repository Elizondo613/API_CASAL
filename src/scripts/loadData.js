require('dotenv').config();
const mongoose = require('mongoose');
const Reto = require('../models/Reto');

const retos = [
  {
    text: "Escribe una frase sobre la leyenda de guatemala que más te aterra.",
    category: "Facebook"
  },
  {
    text: "Comparte que tuviste una noche romántica en Tikal con un turista de (qué país)",
    category: "Facebook"
  },
  {
    text: "Recomienda una película que capture la esencia de Guatemala.",
    category: "Facebook"
  },
  {
    text: "Publica una foto de tu plato típico guatemalteco favorito y di por qué lo es.",
    category: "Facebook"
  },
  {
    text: "Etiqueta a un amigo y cuéntale un chiste que involucre una leyenda.",
    category: "Facebook"
  },
  {
    text: "Comparte un estado imaginando qué pasaría si el Sombrerón tuviera Instagram.",
    category: "Facebook"
  },
  {
    text: "Recomienda un libro que mencione o sea de Guatemala.",
    category: "Facebook"
  },
  {
    text: "Escribe una historia corta donde nadaste en el Lago de Atitlán.",
    category: "Facebook"
  },
  {
    text: "Publica una foto de un mercado de guatemala y describe los olores en una frase poética.",
    category: "Facebook"
  },
  {
    text: "Comparte una foto desde la cima de un volcán de Guate y escribe ¿quién para subir?.",
    category: "Facebook"
  },
  {
    text: "Escribe una frase que defienda el hábitat del quetzal y sube una foto del ave.",
    category: "Facebook"
  },
  {
    text: "Etiqueta a tres amigos y retales a nombrar tres platillos guatemaltecos.",
    category: "Facebook"
  },
  {
    text: "Comparte una leyenda y agrégale un final alternativo moderno.",
    category: "Facebook"
  },
  {
    text: "Recomienda un restaurante típico o café de tu ciudad.",
    category: "Facebook"
  },
  {
    text: "Publica una foto de una iglesia colonial y di que ahí aparece la Siguanaba.",
    category: "Facebook"
  },
  {
    text: "Escribe una frase que describa el sabor del café guatemalteco a un extraterrestre.",
    category: "Facebook"
  },
  {
    text: "Escribe  sobre un lugar poco conocido de Guatemala y por qué deberíamos visitarlo.",
    category: "Facebook"
  },
  {
    text: "Crea un post sobre cómo sería un día en la vida de Tecún Umán en 2024.",
    category: "Facebook"
  },
  {
    text: "Recomienda un lugar en que la llorona pueda aparecer.",
    category: "Facebook"
  },
  {
    text: "Escribe que para tu cumpleaños quieres una piñata de tu leyenda favorita y cual es.",
    category: "Facebook"
  },
  {
    text: "Comparte una foto con la persona de tu familia que sea más llorona o lloron.",
    category: "Facebook"
  },
  {
    text: "Etiqueta a tres amigos y pregúntales si te acompañan a tomar tu atol favorito.",
    category: "Facebook"
  },
  {
    text: "Pública si tu actual o anterior pareja fuera un helado cuál sería y por qué.",
    category: "Facebook"
  },
  {
    text: "Recomienda una serie de TV que te gustaría ver ambientada en Guatemala.",
    category: "Facebook"
  },
  {
    text: "Escribe prefiero que me enamore el sombreron o la siguanaba, qué (etiqueta a un amigo)",
    category: "Facebook"
  },
  {
    text: "Confiesa cuando fue la ultima vez en donde pudo aparecer el cadejo",
    category: "Facebook"
  },
  {
    text: "Crea un post sobre tradiciones guatemaltecas que te gustaría que fueran tendencia mundial.",
    category: "Facebook"
  },
  {
    text: "Recomienda un videojuego y explica cómo lo adoptarías a un escenario guatemalteco.",
    category: "Facebook"
  },
  {
    text: "Escribe en que equipo de futbol de gt te gustaría que juegue Messi o en su defecto CR7",
    category: "Facebook"
  },
  {
    text: "Describe cómo sería una leyenda de gt si tu la inventaras.",
    category: "Facebook"
  },
  {
    text: "Etiqueta a un amigo y pregúntale qué superhéroe crearía basado en la cultura guatemalteca.",
    category: "Facebook"
  },
  {
    text: "Publica una foto de una carreta de cheveres o shucos escribe invito a los primero tres likes.",
    category: "Facebook"
  },
  {
    text: "Recomienda un meme que capture perfectamente el humor guatemalteco.",
    category: "Facebook"
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