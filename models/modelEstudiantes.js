const mongoose = require('mongoose');

//Esquema
const { Schema } = mongoose;

const EstudiantesSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    carnet: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true },
    carrera: { type: String, required: true },
    semestre: { type: Number, required: true }
}, {
    timestamps: true
});

//Modelo

const Estudiantes = mongoose.model('estudiantes', EstudiantesSchema);

module.exports = {Estudiantes}