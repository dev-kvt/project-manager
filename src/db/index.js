import mongoose from 'mongoose';


const connectDB = async () =>{
   try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase connected successfully✅");
   }
   catch(error){
        console.error("❌Error in DataBase connection", error);
        process.exist(1);

   }
} 
export default connectDB;
 