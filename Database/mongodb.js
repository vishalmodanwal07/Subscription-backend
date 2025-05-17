import mongoose from "mongoose";
import { DB_URI , NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error("please define the MONGODB_URI variable inside .env<development/>production>.local");
}

const ConnectDB = async () => {
  try {
     const connectionInstance =  await mongoose.connect(DB_URI);
     console.log(`\n mongodb connected in ${NODE_ENV} !! DB HOST : ${connectionInstance.connection.host}`);
   } catch (error) {
    console.log("error connecting to database" , error);
    process.exit(1);
  }
}

export default ConnectDB;