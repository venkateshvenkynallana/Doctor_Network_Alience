import mongoose from "mongoose";

//function to connect to mongodb database
export const connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log('DataBase connected'));
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log("mongodb error",error)
    }
}