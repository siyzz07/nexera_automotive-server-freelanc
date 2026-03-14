import { Request, Response } from "express";
import { IAuthService } from "../interfaces/authInterface/IAuthService.js";
import { envConfig } from "../config/envConfig.js";
import { AdminMessageEnum } from "../enums/ErrorMessageEnums.js";

export class AuthController {
  private _AuthService: IAuthService;

  constructor(authService: IAuthService) {
    this._AuthService = authService;
  }

  adminLogin = async (req: Request, res: Response): Promise<void> => {
    const result = await this._AuthService.login(req.body);

    if (result) {
        console.log('envConfig.jwt.ACCEESS_TOKEN_EXPIRY :>> ', envConfig.jwt.ACCESS_TOKEN_EXPIRY);
      res.cookie(`accessJwt`, result.tokenAccess, {
        httpOnly: true,
        secure: false,
        maxAge: Number(envConfig.jwt.ACCESS_TOKEN_EXPIRY),
      });


      res.cookie(`refreshJwt`, result.tokenRefresh, {
        httpOnly: true,
        secure: false,
        maxAge: Number(envConfig.jwt.REFRESH_TOKEN_EXPIRY),
      });

      res.status(200).json({
        success: true,
        message: AdminMessageEnum.LOGIN_SUCCESS,
        token:result.token
      }); 
    }
  };

  adminRefreshToken = async (req: Request, res: Response): Promise<void> => {
    const refreshTokenString = req.cookies.refreshJwt;

    if (!refreshTokenString) {
      res.status(401).json({ success: false, message: "No refresh token provided" });
      return;
    }

    try {
      const result = await this._AuthService.refreshToken(refreshTokenString);

      res.cookie(`accessJwt`, result.tokenAccess, {
        httpOnly: true,
        secure: false,
        maxAge: Number(envConfig.jwt.ACCESS_TOKEN_EXPIRY),
      });

      res.cookie(`refreshJwt`, result.tokenRefresh, {
        httpOnly: true,
        secure: false,
        maxAge: Number(envConfig.jwt.REFRESH_TOKEN_EXPIRY),
      });

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
      });
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid refresh token" });
    }
  };
}
