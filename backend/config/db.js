import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb://localhost:27017/tomato_delivery').then(()=>console.log("DB Connected"))
}

