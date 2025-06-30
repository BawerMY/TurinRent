const jws = require('jsonwebtoken');

const SECRET_KEY = "Datemi il diploma per favore :)";

const jwsAuthorize = (req, res, next) => {
    try {
        const decoded = jws.verify(req.headers.authorization, SECRET_KEY);
        next(req, res, decoded.userId);
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = jwsAuthorize;