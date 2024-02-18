// middleware/auth.js

import jwt from 'jsonwebtoken';

export default function authMiddleware(handler) {
  return async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
