import mongoose from "mongoose";

const  dbconnect= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected Succesfully")
        
    } catch (error) {
        console.log("Something went Wrong.." ,error)
    }
}
export default dbconnect