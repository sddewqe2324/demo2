// pages/api/products/[id].js
import { connectToDatabase } from '../../../utils/mongodb';
import Product from '../../../models/Product';


connectToDatabase();
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '40mb' // Set desired value here
        }
    }
}

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            try {
                const { csvFilePath } = req.body;
                console.log(csvFilePath);
                const jsonArray = csvFilePath;
                for (const productData of jsonArray) {
                    const condition = { Title: productData.Title };
                    await Product.findOneAndDelete(condition);

                    const product = new Product({
                        Title: productData["name"],
                        color: productData['color'],
                        size: productData['size'],
                        storage: productData['storage'],
                        selling_price: productData['selling_price'],
                        mrp: productData['mrp'],
                        features: productData['features'],
                        images: productData['img1'],
                        images1: productData['img2'],
                        images2: productData['img3'],
                        images3: productData['img4'],
                        images4: productData['img5'],
                        disp_order: productData['disp_order'],
                        verients: JSON.stringify(productData['verients']),
                    });

                    await product.save();
                }

                // await Product.findByIdAndDelete(id);
                res.status(201).json({ status: 1 });
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
}
