// auth middleware
const jwt = require('jsonwebtoken');
const JWT_SECRET = "cniecnicnieiencie";
const authChecker = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token', error: err });
        req.decoded = decoded;
        res.locals.userId = decoded._id;
        next();
    });
}
// valid token middleware
module.exports = {authChecker};
