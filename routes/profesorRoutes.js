const express = require('express');
const router = express.Router();
const profesorController = require('./controllers/profesorController');

// Ruta para cargar la firma electrónica del profesor
router.post('/cargar-firma', upload.single('firma'), profesorController.cargarFirmaElectronica);

// Ruta para registrar la firma en una clase
router.post('/registrar-firma', profesorController.registrarFirma);

module.exports = router;
