const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const triviaRoutes = require('./routes/trivia_routes');
const riddleRoutes = require('./routes/riddle_routes');
const imageRoutes = require('./routes/image_routes');
const retoRoutes = require('./routes/retoLeyenda_routes');
const mimicaRoutes = require('./routes/mimica_routes');
const retoRRoutes = require('./routes/reto_routes');
const path = require('path');
const cron = require('node-cron');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.send('API is running!');
});

// Ping
cron.schedule('*/5 * * * *', async () => {
  try {
    const response = await axios.get('https://api-casal.onrender.com/api/challenge/mimica');
    console.log('Autoping exitoso:', new Date().toLocaleString());
  } catch (error) {
    console.error('Error en autoping:', error.message);
  }
});

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api', triviaRoutes);
app.use('/api', riddleRoutes);
app.use('/api', imageRoutes);
app.use('/api', retoRoutes);
app.use('/api', mimicaRoutes);
app.use('/api', retoRRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});