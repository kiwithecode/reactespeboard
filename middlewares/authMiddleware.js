const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, 'YOUR_SECRET_STRING', (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send({ auth: false, message: 'Token has expired.' });
            }
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // If token is verified, set the user's ID for the request
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
