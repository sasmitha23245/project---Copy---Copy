import mongoose, { connect } from "mongoose";

const connectDB= async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection created Successfully!!")
    }catch(error){
        console.log("Connection failed", error.message);
        process.exit(1);
    }
}
export default connectDB;