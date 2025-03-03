const express = require('express');
const router = express.Router();
const imageController = require('../controllers/Image_controller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear directorio de uploads si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurar almacenamiento para multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Crear nombre de archivo único para evitar colisiones
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Filtrar archivos por tipo (solo imágenes)
const fileFilter = (req, file, cb) => {
  // Aceptar solo tipos de imágenes comunes
  if (
    file.mimetype === 'image/jpeg' || 
    file.mimetype === 'image/png' || 
    file.mimetype === 'image/gif' || 
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no soportado. Sólo se permiten imágenes (JPEG, PNG, GIF, WEBP)'), false);
  }
};

// Configurar multer con límite de 2MB
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  }
});

// CRUD Endpoints con soporte para archivos
router.post('/image', upload.single('image'), imageController.createImage); // Crear con archivo
router.get('/image', imageController.getAllImages); // Obtener todas (sin cambios)
router.get('/image/:id', imageController.getImageById); // Obtener por ID (sin cambios)
router.put('/image/:id', upload.single('image'), imageController.updateImage); // Actualizar con archivo
router.delete('/image/:id', imageController.deleteImage); // Eliminar (sin cambios)

// Endpoint para obtener una imagen aleatoria (filtrando solo las activas)
router.get('/challenge/image', imageController.getRandomImage);

module.exports = router;