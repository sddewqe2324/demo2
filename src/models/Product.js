// models/Product.js
import mongoose from 'mongoose';

let Product;

try {
  // Check if the model is already defined
  Product = mongoose.model('Product');
} catch (error) {
  // If the model is not defined, define it
  const productSchema = new mongoose.Schema({
    Title: String,
    color: String,
    size: String,
    storage: String,
    selling_price: String,
    mrp: String,
    features: String,
    images: String,
    images1: String,
    images2: String,
    images3: String,
    images4: String,
    disp_order: String,
    verients: String,
  });

  Product = mongoose.model('Product', productSchema);
}

export default Product;
