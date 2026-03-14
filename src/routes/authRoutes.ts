import express from "express";
import { authControllerInstance } from "../di/authDi.js";


const authRoute = express.Router()

authRoute.post('/admin/login',authControllerInstance.adminLogin)
authRoute.post('/admin/refresh-token', authControllerInstance.adminRefreshToken)



export default authRoute