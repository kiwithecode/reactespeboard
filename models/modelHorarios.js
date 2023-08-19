const mongoose = require('mongoose');

// Esquema
const { Schema } = mongoose;

const HorariosSchema = new Schema({
    profesor: { type: String, required: true },
    codigo_materia: { type: String, required: true },
    numero_materia: { type: String, required: true },
    nombre_materia: { type: String, required: true },
    dia: { type: String, required: true }, // Reemplaza 'fecha' con 'dia'
    hora_inicio: { type: String, required: true },
    hora_fin: { type: String, required: true }
}, {
    timestamps: true
});

// Modelo
const Horarios = mongoose.model('horarios', HorariosSchema);

module.exports = {Horarios}
