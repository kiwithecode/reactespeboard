const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Profesores } = require('../models/modelProfesores');  // Adjust the path as needed

exports.login = async (req, res) => {
    try {
        // Find the professor based on email
        const profesor = await Profesores.findOne({ correo: req.body.correo });
        if (!profesor) {
            return res.status(401).send({ message: 'Authentication failed. Professor not found.' });
        }

        // Check if password matches
        profesor.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch || err) {
                return res.status(401).send({ message: 'Authentication failed. Wrong password.' });
            }

            // If user is found and password is correct, create a token
            const token = jwt.sign({ id: profesor._id }, 'YOUR_SECRET_STRING', {
                expiresIn: 86400  // Token expires in 24 hours
            });

            // Return the token as JSON
            res.status(200).send({ auth: true, token: token });
        });

    } catch (error) {
        res.status(500).send({ message: 'Error on the server.' });
    }
};
