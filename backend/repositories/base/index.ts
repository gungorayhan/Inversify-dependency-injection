import { Model } from "mongoose";
import { AppError } from "../../utils/Error";
import { IBaseRepository } from "../../interfaces/base";
import { injectable, unmanaged } from "inversify";


@injectable()
export class BaseRepository<T> implements IBaseRepository<T>{
    private model:any

    constructor(@unmanaged() model:any){
        this.model=model
    }


    async findById(id:string):Promise<T | null>{
        try {
            return await this.model.findById(id).exec()
        } catch (error) {
            throw new AppError(500,"Database error")
        }
    }

    async findAll(): Promise<T[]> {
        try {
          return await this.model.find().exec();
        } catch (error) {
          console.error("Database error finding all records:", error);
          throw new AppError(500, 'Database error');
        }
      }
    
      async create(item: T): Promise<T> {
        try {
          return await this.model.create(item);
        } catch (error) {
          console.error("Database error creating record:", error);
          throw new AppError(500, 'Database error');
        }
      }
    
      async update(id: string, item: Partial<T>): Promise<T | null> {
        try {
          return await this.model.findByIdAndUpdate(id, item, { new: true }).exec();
        } catch (error) {
          console.error("Database error updating record:", error);
          throw new AppError(500, 'Database error');
        }
      }
    
      async remove(id: string): Promise<void> {
        try {
          await this.model.findByIdAndDelete(id).exec();
        } catch (error) {
          console.error("Database error removing record:", error);
          throw new AppError(500, 'Database error');
        }
      }
}