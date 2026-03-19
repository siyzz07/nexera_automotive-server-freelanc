import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { StatusCodeEnum } from '../enums/httpStatusCondeEnums.js';

export class ContactController {
  async sendContactEmail(req: Request, res: Response) {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(StatusCodeEnum.BAD_REQUEST).json({
        success: false,
        message: 'All fields are required'
      });
    }

    try {
      // Configuration for high-performance mailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
        to: 'nexeramarket.official@gmail.com',
        replyTo: email,
        subject: `Nexera Contact: Inquiry from ${firstName} ${lastName}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #1a1a1a; background: #000; color: #fff;">
            <h2 style="color: #00ff66;">New Inquiry Logged</h2>
            <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
            <div style="background: #111; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #666;">Nexera Automotive Dispatch Protocol</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);

      return res.status(StatusCodeEnum.OK).json({
        success: true,
        message: 'Transmission Successful'
      });
    } catch (error) {
      console.error('Email Dispatch Error:', error);
      return res.status(StatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to transmit message'
      });
    }
  }
}
