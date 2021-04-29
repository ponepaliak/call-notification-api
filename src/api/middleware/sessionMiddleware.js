const jwt = require('jsonwebtoken');
const config = require('dotenv').config().parsed;

module.exports = function sessionMiddleware(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        next();
    });
}