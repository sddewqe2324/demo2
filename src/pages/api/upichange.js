// pages/api/Upichange.js
import { connectToDatabase } from '../../utils/mongodb';
import Upichange from '../../models/Upichange';
import FacebookPixel from '../../models/FacebookPixel';
import authenticateToken from './middleware/auth';

connectToDatabase();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch Facebook Pixel data without authentication for 'GET'
      const pixelData = await Upichange.findOne({});
      const pixelData1 = await FacebookPixel.findOne({});
      res.status(200).json({ upi: pixelData, pixelId: pixelData1 });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // For 'POST' and 'PUT', apply the authentication middleware
    authenticateToken(req, res, () => handleRequest(req, res));
  }
}

async function handleRequest(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
    case 'PUT':
      try {
        // Create or update Facebook Pixel data with authentication
        const existingPixelData = await Upichange.findOne({});

        if (existingPixelData) {
          // Update existing record
          const updatedPixelData = await Upichange.findByIdAndUpdate(
            existingPixelData._id,
            req.body,
            { new: true }
          );
          res.status(200).json({ status: 1, updatedPixelData });
        } else {
          // Create new record
          const newPixelData = new Upichange(req.body);
          const savedPixelData = await newPixelData.save();
          res.status(201).json({ status: 1, savedPixelData });
        }
      } catch (error) {
        res.status(500).json({ status: 0, message: 'Internal Server Error' });
      }
      break;

    default:
      res.status(405).json({ status: 0, message: 'Method Not Allowed' });
      break;
  }
}
