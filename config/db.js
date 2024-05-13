import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const join = await mongoose.connect(process.env.MONGO);
        console.log(`Connected to MongoDb ${join.connection.host}`)
    } catch (error) {
        console.log(` Error in MongoDb Connection: ${error}`)
    }
}
export default connectDb;
