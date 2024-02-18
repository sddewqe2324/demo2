// pages/api/login.js

import User from '../../models/User';
import { connectToDatabase } from '../../utils/mongodb';
import jwt from 'jsonwebtoken';

connectToDatabase();
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'xxxxz', { expiresIn: '1h' });
    // Send the token in the response
    res.status(201).send({ message: 'done', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
