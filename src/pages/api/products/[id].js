// pages/api/products/[id].js
import { connectToDatabase } from '../../../utils/mongodb';
import Product from '../../../models/Product';
import authenticateToken from '../middleware/auth';


connectToDatabase();

export default async function handler(req, res) {
    // Apply the middleware for token verification
    authenticateToken(req, res, () => handleRequest(req, res));
}
async function handleRequest(req, res) {
    const { method } = req;
    switch (method) {
        case 'GET':
            // Fetch a specific product
            try {
                const product = await Product.findById({ _id: req.query.id });
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.status(201).json(product);
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'PUT':
            // Update a product
            try {
                const updatedProduct = await Product.findByIdAndUpdate(
                    req.query.id,
                    req.body,
                    { new: true } // Return the updated product
                );
                if (!updatedProduct) {
                    return res.status(404).json({ message: 'Product not found' });
                }
                res.status(201).json({ status: 1, data: updatedProduct });
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'DELETE':
            try {
                // Delete a product
                const { id } = req.query;
                await Product.findByIdAndDelete(id);
                res.status(201).json({ status: 1, data: id });
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'POST':
            try {
                const { id } = req.query;
                const { csvFilePath } = req.body;
                const jsonArray = await csvFilePath;
                console.log(jsonArray);
                for (const productData of jsonArray) {
                const condition = { Title: productData.Title };

                // Find and delete products that match the condition
                await Product.findOneAndDelete(condition);
                const product = new Product({
                    Title: productData.Title,
                    color: productData['Option1 Name'] === "Color" ? productData['Option1 Value'] : "",
                    size: productData['Option1 Name'] === "Size" ? productData['Option1 Value'] : "",
                    storage: productData['Option1 Name'] === "Storage" ? productData['Option1 Value'] : "",
                    selling_price: productData['Variant Price'],
                    mrp: productData['Variant Compare At Price'],
                    features: productData['Body (HTML)'],
                    images: productData['Image Src'],
                    images1: "",
                    images2: "",
                    images3: "",
                    images4: "",
                    disp_order: "",
                });
                await product.save();
                }

                await Product.findByIdAndDelete(id);
                res.status(201).json({ status: id });
            } catch (error) {
                // res.status(500).json({ message: error });
            }
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
}
