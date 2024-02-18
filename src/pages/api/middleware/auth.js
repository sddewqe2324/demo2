// middleware/auth.js
import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
    const tokenWithoutBearer = token.split(' ')[1];
    jwt.verify(tokenWithoutBearer, 'xxxxz', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden - Invalid token' });
        }
        req.user = user;
        next();
    });
}
