const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const triviaRoutes = require('./routes/trivia_routes');
const riddleRoutes = require('./routes/riddle_routes');
const imageRoutes = require('./routes/image_routes');
const retoRoutes = require('./routes/retoLeyenda_routes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Conectar a la base de datos
//DT3YRSLoVDdyjP0w
connectDB();

// Rutas
app.use('/api', triviaRoutes);
app.use('/api', riddleRoutes);
app.use('/api', imageRoutes);
app.use('/api', retoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});