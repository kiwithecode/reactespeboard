const mongoose = require('mongoose');

// Esquema
const { Schema } = mongoose;

const RegistrosFirmasSchema = new Schema({
    profesor_id: { type: Schema.Types.ObjectId, ref: 'Profesores' }, // Referencia al profesor que realiza el registro de firma
    clase_id: { type: Schema.Types.ObjectId, ref: 'Horarios' }, // Referencia a la clase en la que se registra la firma
    fecha_registro: { type: Date, required: true },
    archivo_odf: { type: Buffer } // Campo para almacenar el contenido binario del archivo ODF
}, {
    timestamps: true
});

// Modelo
const RegistroFirmas = mongoose.model('registroFirmas', RegistrosFirmasSchema);

module.exports = { RegistroFirmas };
