export class BaseEntity{
    constructor(
        public readonly _id?:string,
        public readonly createdAt?:Date,
        public readonly updatedAt?:Date
    ){}
}