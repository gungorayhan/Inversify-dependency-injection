import { FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(item: T): Promise<T>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    remove(id: string): Promise<void>;
    findByFilters(filters: FilterQuery<T>): Promise<T[]>
  }