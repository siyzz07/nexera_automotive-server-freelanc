


export interface IAuthService {

    login (data:{email:string, password:string}) : Promise<any>

}