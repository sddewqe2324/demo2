import mongoose from 'mongoose';

let User;

try {
    // Check if the model is already defined
    User = mongoose.model('user');
} catch (error) {
    // If the model is not defined, define it
    const userSchema = new mongoose.Schema({
        email: { type: String, required: true },
        password: { type: String, required: true },
    });

    User = mongoose.model('user', userSchema);
}

export default User;
