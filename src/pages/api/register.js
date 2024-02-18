// pages/api/register.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  // You might want to add validation and hashing here

  const { db } = await connectToDatabase();

  // Check if the user already exists
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // Insert the new user
  await db.collection('users').insertOne({ email, password });

  res.status(201).json({ message: 'Registration successful' });
}
