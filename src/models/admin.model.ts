import mongoose, { model } from "mongoose";
import { IAdmin } from "../shared/types/admin.interface.js";



const adminSchema = new mongoose.Schema<IAdmin>({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


export const Admin = model<IAdmin> ('Admin',adminSchema)
