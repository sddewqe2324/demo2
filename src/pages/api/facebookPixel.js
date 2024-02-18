// pages/api/facebookPixel.js

import { connectToDatabase } from '../../utils/mongodb';
import FacebookPixel from '../../models/FacebookPixel';
import authenticateToken from './middleware/auth';

connectToDatabase();

export default async function handler(req, res) {
  // Apply the middleware for token verification
  authenticateToken(req, res, () => handleRequest(req, res));
}

async function handleRequest(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Fetch Facebook Pixel data without validation
        const pixelData = await FacebookPixel.findOne({});
        res.status(200).json(pixelData);
      } catch (error) {
        res.status(500).json({ status: 0, message: 'Internal Server Error' });
      }
      break;

    case 'POST':
      try {
        // Create or update Facebook Pixel data
        const existingPixelData = await FacebookPixel.findOne({});

        if (existingPixelData) {
          // Update existing record
          const updatedPixelData = await FacebookPixel.updateMany({}, { FacebookPixel: req.body.pixelId });
          res.status(200).json({ status: 1, updatedPixelData });
        } else {
          // Create new record
          const newPixelData = new FacebookPixel({ FacebookPixel: req.body.pixelId });
          const savedPixelData = await newPixelData.save();
          res.status(201).json({ status: 1, savedPixelData });
        }
      } catch (error) {
        res.status(500).json({ status: 0, message: 'Internal Server Error' });
      }
      break;

    case 'PUT':
      try {
        // Create or update Facebook Pixel data
        const existingPixelData = await FacebookPixel.findOne({});

        if (existingPixelData) {
          // Update existing record
          const updatedPixelData = await FacebookPixel.findByIdAndUpdate(
            existingPixelData._id,
            { FacebookPixel: req.body.pixelId },
            { new: true, runValidators: true }
          );
          res.status(200).json({ status: 1, updatedPixelData });
        } else {
          // Create new record
          const newPixelData = new FacebookPixel({ FacebookPixel: req.body.pixelId });
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
