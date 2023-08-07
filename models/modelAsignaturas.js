const mongoose = require('mongoose');

//Esquema
const { Schema } = mongoose;

const AsignaturasSchema = new Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    carrera_materia: { type: String, required: true},
    profesor_id: { type: Schema.Types.ObjectId, ref: 'Profesores' } // Referencia al profesor encargado de la asignatura
}, {
    timestamps: true
});

//Modelo

const Asignaturas = mongoose.model('asignaturas', AsignaturasSchema);

module.exports = {Asignaturas}