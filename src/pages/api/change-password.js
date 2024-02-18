// pages/api/change-password.js

import { connectToDatabase } from '../../utils/mongodb';
import authenticateToken from './middleware/auth';

export default async function handler(req, res) {
  // Apply the middleware for token verification
  authenticateToken(req, res, () => handleRequest(req, res));
}
 async function handleRequest(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, oldPassword, newPassword } = req.body;

  // You might want to add validation and hashing here

  const { db } = await connectToDatabase();

  // Check if the user exists
  const user = await db.collection('users').findOne({ email, password: oldPassword });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Update the password
  await db.collection('users').updateOne({ email }, { $set: { password: newPassword } });

  res.status(200).json({ message: 'Password changed successfully' });
}
