import { AdminMessageEnum } from "../enums/ErrorMessageEnums.js";
import { StatusCodeEnum } from "../enums/httpStatusCondeEnums.js";
import { IAdminRepository } from "../interfaces/adminInterface/IAdminRepository.js";
import { IAuthService } from "../interfaces/authInterface/IAuthService.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import { comparePassword } from "../utils/hash.js";
import { accessToken, refreshToken } from "../utils/jwt.js";

class AuthService implements IAuthService {
  private AdminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.AdminRepository = adminRepository;
  }

  login = async (data: { email: string; password: string }): Promise<any> => {
    const { email, password } = data;

    const adminData = await this.AdminRepository.findAdminByMail(email);

    if (adminData) {
      const adminPassword = adminData.password;
      const isAdmin = await comparePassword(password, adminPassword);

      if (isAdmin) {
            
         const tokenAccess  =  accessToken({userId:adminData._id})
         const tokenRefresh =  refreshToken({userId:adminData._id})


         
        

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
}
