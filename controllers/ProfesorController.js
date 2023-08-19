const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Profesor = require('../models/modelProfesores');
const RegistroFirmas = require('../models/modelRegistroFirmasFirmas');

// Middleware para cargar la firma electrónica del profesor
exports.cargarFirmaElectronica = async (req, res) => {
  const profesorId = req.user.id;
  const firmaElectronica = req.file.buffer;

  await Profesor.findByIdAndUpdate(profesorId, { firmaElectronica });

  res.redirect('/dashboard');
};

// Middleware para registrar la firma en una clase
exports.registrarFirma = async (req, res) => {
  const profesorId = req.user.id;
  const claseId = req.body.claseId;

  const profesor = await Profesor.findById(profesorId);
  if (!profesor.firmaElectronica) {
    return res.render('cargarFirma', { error: 'Debes cargar tu firma electrónica antes de registrar la firma en la clase.' });
  }

  await RegistroFirmas.create({ profesor_id: profesorId, clase_id: claseId, fecha_registro: new Date() });

  res.redirect('/dashboard');
};

// Función para registrar un profesor
exports.register = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        
        const newProfesor = new Profesor({
            nombre: req.body.nombre,
            ID: req.body.ID,
            cedula: req.body.cedula,
            fecha_nacimiento: req.body.fecha_nacimiento,
            correo: req.body.correo,
            password: hashedPassword
        });

        const savedProfesor = await newProfesor.save();

        res.status(200).send({ message: 'Registration successful', profesor: savedProfesor });
    } catch (error) {
        res.status(500).send({ message: 'Error registering the professor.' });
    }
};

// Función para iniciar sesión como profesor
exports.login = async (req, res) => {
    try {
        const profesor = await Profesor.findOne({ correo: req.body.correo });
        if (!profesor) {
            return res.status(401).send({ message: 'Authentication failed. Professor not found.' });
        }

        profesor.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch || err) {
                return res.status(401).send({ message: 'Authentication failed. Wrong password.' });
            }

            const token = jwt.sign({ id: profesor._id }, 'YOUR_SECRET_STRING', {
                expiresIn: 86400
            });

            res.status(200).send({ auth: true, token: token });
        });

    } catch (error) {
        res.status(500).send({ message: 'Error on the server.' });
    }
};
