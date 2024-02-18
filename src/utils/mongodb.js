import mongoose from 'mongoose';

const uri = 'mongodb+srv://v4x123:v4x123@cluster0.i3hnzcs.mongodb.net/ss';
export async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    mongoose.set("strictQuery", false)
    const db = await mongoose.connection
    db.once('open', function () {
      console.log('Database connected successfully!')
    })
    db.on('error', console.error.bind(console, 'Database connection failed'))

  } catch (error) {
    console.log(error);
  }
}
