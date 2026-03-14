import { IAdminRepository } from "../interfaces/adminInterface/IAdminRepository.js";
import { Admin } from "../models/admin.model.js";
import { IAdmin } from "../shared/types/admin.interface.js";
import { BaseRepository } from "./BaseRepository.js";


export class AdminRepository extends BaseRepository<IAdmin>  implements IAdminRepository {

    private _AdminModel = Admin

    constructor(){
        super(Admin)
    }

    async findAdminByMail(email: string): Promise<null | {_id:string, email: string; password: string; }> {
         let result = await this.findOne({email})  
         return result
    }

    async findAdminById(id: string): Promise<null | {_id:string, email: string; password: string; }> {
        let result = await this.findById(id)
        return result
    }
}