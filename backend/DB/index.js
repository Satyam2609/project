import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const connectInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongodb is connected successfully ${connectInstance}`)
    }
    catch(error){
        console.log('mongodb is not connnected' , error)
        process.exit(1)
    }
}
export default connectDB