

export interface IAdminRepository {

    findAdminByMail(email:string):Promise<null | {_id:string,email:string , password:string}>
    findAdminById(id:string):Promise<null | {_id:string,email:string , password:string}>

}