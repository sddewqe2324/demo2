// // models/FacebookPixel.js
// import mongoose from 'mongoose';

// const facebookPixelSchema = new mongoose.Schema({
//   pixelId: { type: String, required: true },
//   // Add other fields as needed
// });

// const FacebookPixel = mongoose.model('FacebookPixel', facebookPixelSchema);

// export default FacebookPixel;
import mongoose from 'mongoose';

let FacebookPixel;

try {
  // Check if the model is already defined
  FacebookPixel = mongoose.model('FacebookPixel');
} catch (error) {
  // If the model is not defined, define it
  const facebookPixelSchema = new mongoose.Schema({
    FacebookPixel: { type: String },
  });

  FacebookPixel = mongoose.model('FacebookPixel', facebookPixelSchema);
}

export default FacebookPixel;
