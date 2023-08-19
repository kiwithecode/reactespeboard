const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // hash password
// Esquema
const { Schema } = mongoose;

const ProfesoresSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    ID: { type: String, required: true, unique: true },
    cedula: { type: String, required: true, unique: true },
    fecha_nacimiento: { type: Date, required: true },
    correo: { type: String, required: true, unique: true },
    firmaElectronica: { type: Buffer }, // Nuevo campo para la firma electrónica del profesor en formato binario

    password: { type: String, required: true }
}, {
    timestamps: true
});

// antes de guardar hacer hash al password
ProfesoresSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
});

// metodo para comprar passwords (login)
ProfesoresSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// Modelo
const Profesores = mongoose.model('profesores', ProfesoresSchema);

module.exports = { Profesores }
