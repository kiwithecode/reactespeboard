const mongoose = require('mongoose');

//Esquema
const { Schema } = mongoose;

const ProfesoresSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true, unique: true },
    departamento: { type: String, required: true },
    firmaElectronica: { type: Buffer } // Nuevo campo para la firma electrónica del profesor en formato binario

}, {
    timestamps: true,
    versionKey: false
});
//Modelo
const Profesores = mongoose.model('profesores', ProfesoresSchema);

module.exports = { Profesores}