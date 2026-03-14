


export interface IAuthService {

    login (data:{email:string, password:string}) : Promise<void | {token:string,tokenAccess:string , tokenRefresh:string}>
    refreshToken(token: string): Promise<{ tokenAccess: string, tokenRefresh: string }>

}