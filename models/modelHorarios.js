const mongoose = require('mongoose');

//Esquema
const { Schema } = mongoose;

const HorariosSchema = new Schema({
    asignatura_id: { type: Schema.Types.ObjectId, ref: 'Asignaturas' }, // Referencia a la asignatura a la que pertenece la clase
    fecha: { type: Date, required: true },
    hora_inicio: { type: String, required: true },
    hora_fin: { type: String, required: true }
}, {
    timestamps: true
});

// Modelo

const Horarios = mongoose.model('horarios', HorariosSchema);

module.exports = {Horarios}