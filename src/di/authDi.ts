import { AuthController } from "../controllers/authController.js";
import { AuthService } from "../services/authService.js";
import { adminRepository } from "./repositoryDi.js";


const authServiceInstance = new AuthService(adminRepository)
const authControllerInstance = new AuthController(authServiceInstance)

export {authControllerInstance}