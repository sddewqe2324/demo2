import mongoose from 'mongoose';

let Upichange;

try {
    // Check if the model is already defined
    Upichange = mongoose.model('Upichange');
} catch (error) {
    // If the model is not defined, define it
    const UpichangeSchema = new mongoose.Schema({
        upi: { type: String, required: true },
        Gpay: { type: Boolean },
        Paytm: { type: Boolean },
        Bhim: { type: Boolean },
        Phonepe: { type: Boolean },
        WPay: { type: Boolean },
    });

    Upichange = mongoose.model('Upichange', UpichangeSchema);
}

export default Upichange;
