import { injectable, inject } from "inversify";
import { IUserService } from "../../interfaces";
import { INTERFACE_TYPE } from "../../utils";
import { UserEntity } from "../../entities";

//subscribeServices
@injectable()
export class NotificationServices{
    
    constructor(
        @inject(INTERFACE_TYPE.UserService) private userService : IUserService
    ){
        if (!this.userService) {
            throw new Error("UserService is not defined");
        }
        this.userService.subscribeToUserCreated(this.sendCreateUserNotification.bind(this))
    }

    sendCreateUserNotification(userData:UserEntity){
        console.log(`Sending notification for user: ${userData}`)
    }
}