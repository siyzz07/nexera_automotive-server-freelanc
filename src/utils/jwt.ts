
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";

interface IJwtPayload {
        userId:string
}


const JWT_ACCESS_TOKEN:string|undefined = envConfig.jwt.ACCESS_TOKEN_KEY
const JWT_REFRESH_TOKEN:string|undefined = envConfig.jwt.REFRESH_TOKEN_KEY


if (!JWT_ACCESS_TOKEN) {
  throw new Error("JWT_ACCESS_TOKEN is not defined in environment variables");
}

if (!JWT_REFRESH_TOKEN) {
  throw new Error("JWT_REFRESH_TOKEN is not defined in environment variables");
}



export const accessToken = (payload:IJwtPayload) =>{
  return jwt.sign(payload,JWT_ACCESS_TOKEN,{expiresIn:"10m"})
}
export const token = () =>{
  return jwt.sign({},JWT_ACCESS_TOKEN,{expiresIn:"10m"})
}



export const refreshToken = (payload:IJwtPayload) =>{
  return jwt.sign(payload,JWT_REFRESH_TOKEN,{expiresIn:"7d"})
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_TOKEN) as IJwtPayload;
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_TOKEN) as IJwtPayload;
}