import { injectable } from "inversify";
import {createClient,RedisClientType, } from "redis"
import { IRedisService } from "../../interfaces/redis";


@injectable()
export class RedisService implements IRedisService{
    private client:RedisClientType;

    constructor(){
        this.client=createClient();

        this.client.on('error',(err)=>{
            console.error(err)
        })
    }
    async connect():Promise<void> {
        if (!this.client.isOpen) {
          await this.client.connect();
        }
      }

    async set(key:string, value:string, expiry?:number):Promise<void>{
        await this.connect();
        if(expiry){
            await this.client.set(key,value,{
                EX:expiry //belirtilen süre sonunda anahtar silinir
            })
        }else{
            await this.client.set(key,value);
        }
    }
    
    async get(key: string): Promise<string | null> {
        await this.connect();
        const value = await this.client.get(key);
        try {
            return value ? JSON.parse(value) : null;
        } catch (e) {
            // JSON parse edilemiyorsa, bu bir string'dir, direkt return et
            return value;
        }
    }
   
    async setIfNotExists(key:string,value:any,expiry?:number):Promise<boolean>{
        await this.connect();
console.log(value)
        const stringValue = typeof value === "object" ? JSON.stringify(value) : value;
console.log(stringValue);
        const result = await this.client.setNX(key,stringValue)
        if(result && expiry){
            await this.client.expire(key,expiry)
        }
        return result;
    }

    async disconnect():Promise<void> {
        if (this.client.isOpen) {
          await this.client.quit();  // Bağlantıyı düzgün kapatma
        }
      }
}

