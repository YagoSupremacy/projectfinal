const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Acesso negado.');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Token inválido.');
    }
};

module.exports = auth;