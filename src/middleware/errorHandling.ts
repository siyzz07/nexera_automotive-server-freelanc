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
  const message = err.message || 'Internal Server Error';
  
  console.error('--- ERROR HANDLER ---');
  console.error('Path:', req.path);
  console.error('Status Code:', statusCode);
  console.error('Error Message:', message);
  console.error('Stack:', err.stack);
  console.error('----------------------');
  
  res.status(statusCode).json({
    success: false,
    message,
  });
};