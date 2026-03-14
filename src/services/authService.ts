
import { AdminMessageEnum } from "../enums/ErrorMessageEnums.js";
import { StatusCodeEnum } from "../enums/httpStatusCondeEnums.js";
import { IAdminRepository } from "../interfaces/adminInterface/IAdminRepository.js";
import { IAuthService } from "../interfaces/authInterface/IAuthService.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { comparePassword } from "../utils/hash.js";
import { accessToken, refreshToken, token, verifyRefreshToken } from "../utils/jwt.js";

export class AuthService implements IAuthService {
  private AdminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.AdminRepository = adminRepository;
  }

  login = async (data: { email: string; password: string }): Promise<void | {token:string,tokenAccess:string , tokenRefresh:string}> => {
    const { email, password } = data;

    const adminData = await this.AdminRepository.findAdminByMail(email);
    if (adminData) {
      const adminPassword = adminData.password;
      const isAdmin = await comparePassword(password, adminPassword);

      if (isAdmin) {
            
         const tokenAccess  =  accessToken({userId:adminData._id})
         const tokenRefresh =  refreshToken({userId:adminData._id})
         const tokenData = token()

         return {token:tokenData,tokenAccess,tokenRefresh}

      } else {
        throw new ErrorResponse(
          AdminMessageEnum.INVALID_CREDENTIALS,
          StatusCodeEnum.BAD_REQUEST,
        );
      }
    } else {
      throw new ErrorResponse(
        AdminMessageEnum.ADMIN_NOT_FOUND,
        StatusCodeEnum.NOT_FOUND,
      );
    }
  };

  refreshToken = async (tokenString: string): Promise<{ tokenAccess: string, tokenRefresh: string }> => {
    try {
      const decoded = verifyRefreshToken(tokenString);
      const adminData = await this.AdminRepository.findAdminById(decoded.userId);
      
      if (!adminData) {
        throw new ErrorResponse("Admin not found", StatusCodeEnum.UNAUTHORIZED);
      }

      const tokenAccess = accessToken({ userId: adminData._id });
      const tokenRefresh = refreshToken({ userId: adminData._id });
      

      return { tokenAccess, tokenRefresh };
    } catch (error) {
           console.log('error :>> ', error);
      throw new ErrorResponse("Invalid refresh token", StatusCodeEnum.UNAUTHORIZED);
    }
  };
}
