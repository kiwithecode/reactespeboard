const mongoose = require('mongoose');

//Esquema
const { Schema } = mongoose;

const AdministradoresSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

//Modelo

const Administradores = mongoose.model('administradores', AdministradoresSchema);

module.exports = {Administradores}