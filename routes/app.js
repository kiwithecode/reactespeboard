const mongoose = require('mongoose');

const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');

const profesorController = require('./controllers/ProfesorController');

// Configuración de multer para guardar los archivos en el servidor
const storage = multer.memoryStorage(); // Almacenar el archivo en memoria (Buffer)
const upload = multer({ storage: storage });

//archivos necesaris
const {Estudiantes} = require('./models/modelEstudiantes');
const {Profesores} = require('./models/modelProfesores');
const {Administradores} = require('./models/modelAdministradores');
const {Asignaturas} = require('./models/modelAsignaturas');
const {Horarios} = require('./models/modelHorarios');
const {RegistroFirmas} = require('./models/modelRegistroFirmas');



const DB_URI = 'mongodb://127.0.0.1:27017/espe_board'

//CONEXION

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a la base de datos.');
        // Aquí puedes continuar con el código que utiliza los modelos y realiza operaciones con la base de datos
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

// Funciones

const crearEstudiante = () => {
    Estudiantes.create(
        {
            nombre: 'Alexander',
            apellido: 'Fabara',
            carnet: 'L0037704122',
            correo: 'pablo@espe.22edu.ec',
            telefono: '098736422',
            carrera: 'software',
            semestre: '8'
        }
    )
}


//crearEstudiante()

// ARchivo ODF

// Requerir las rutas
const profesorRoutes = require('./routes/profesorRoutes');

// Agregar las rutas a la aplicación
app.use('/profesor', profesorRoutes);

// Otras configuraciones y middleware 

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});