export interface IRedisService{
     connect():Promise<void>,
     set(key:string, value:string, expiry?:number):Promise<void>
     get(key:string):Promise<string | null>
     setIfNotExists(key:string,value:any,expiry?:number):Promise<boolean>,
     disconnect():Promise<void>
}