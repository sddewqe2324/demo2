// pages/api/products/index.js
import { connectToDatabase } from '../../../utils/mongodb';
import Product from '../../../models/Product';

connectToDatabase();
export default async function handler(req, res) {

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const products = await Product.find({});
                res.status(200).json(products);
            } catch (error) {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'POST':
            try {
                const { name, color, img1, img2, img3, img4, img5, size, storage, selling_price, mrp, features, disp_order } = req.body;
                const newProduct = new Product({
                    Title:name,
                    color,
                    size,
                    storage,
                    selling_price,
                    mrp,
                    features,
                    images:img1, images1:img2, images2:img3, images3:img4, images4:img5,
                    disp_order,
                });

                const savedProduct = await newProduct.save();
                res.status(201).json({ status: 1, data: savedProduct });
            } catch (error) {
                res.status(500).json({ status: 0, message: 'Internal Server Error' });
            }
            break;

        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
}
