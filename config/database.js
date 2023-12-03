import mongoose from "mongoose";

mongoose.set('strictQuery', false)
mongoose.set('strictPopulate', false)
const db = async () => {
    try {
        const conn = await mongoose.connect('mongodb://0.0.0.0:27017/messenger');
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(error)
    }
}

export default db;
