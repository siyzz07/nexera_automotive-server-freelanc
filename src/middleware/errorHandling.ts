import { Request, Response, NextFunction } from "express";
// import { MessageEnum } from "../enums/messagesEnum";



interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  _next: NextFunction
) => {



  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server Error';
  console.log('statusCode', statusCode)
  console.log('message', message)
  
  res.status(statusCode).json({
    success: false,
    message,
  });

  _next()
};