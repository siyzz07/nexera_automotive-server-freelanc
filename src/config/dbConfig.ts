import mongoose from "mongoose"
import { envConfig } from "./envConfig.js"

export const dbConfig = async () =>{

    try {   
        
        await mongoose.connect(envConfig.dataBase.DATABASE_URL)
        console.log('Database connected successfully....')
        
    } catch (error) {   
        if(error instanceof Error){
          console.log('error to connect Database :->',error.message);
          
        }
        
    }
}