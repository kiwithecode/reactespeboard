// controllers/profesorController.js
const Profesor = require('../models/modelProfesores');
const RegistroFirmas = require('../models/modelRegistroFirmasFirmas');

// Middleware para cargar la firma electrónica del profesor
exports.cargarFirmaElectronica = async (req, res) => {
  const profesorId = req.user.id; // Suponiendo que tienes la información del profesor desde la autenticación (passport o similar)
  const firmaElectronica = req.file.buffer; // Obtiene el objeto Buffer del archivo cargado

  // Actualiza la firma electrónica del profesor en la base de datos
  await Profesor.findByIdAndUpdate(profesorId, { firmaElectronica });

  res.redirect('/dashboard'); // Redirige a la página de inicio del profesor
};

// Middleware para registrar la firma en una clase
exports.registrarFirma = async (req, res) => {
  const profesorId = req.user.id; // Suponiendo que tienes la información del profesor desde la autenticación (passport o similar)
  const claseId = req.body.claseId; // Suponiendo que obtienes el ID de la clase desde el formulario

  // Verifica si el profesor ha cargado su firma electrónica
  const profesor = await Profesor.findById(profesorId);
  if (!profesor.firmaElectronica) {
    return res.render('cargarFirma', { error: 'Debes cargar tu firma electrónica antes de registrar la firma en la clase.' });
  }

  // Guarda el registro de firma en la base de datos
  await RegistroFirmas.create({ profesor_id: profesorId, clase_id: claseId, fecha_registro: new Date() });

  res.redirect('/dashboard'); // Redirige a la página de inicio del profesor con un mensaje de éxito
};
