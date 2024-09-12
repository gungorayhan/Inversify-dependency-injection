import { Container } from "inversify";
import { SocketChat } from "../../libs/socketChat";
import { INTERFACE_TYPE } from "../../utils";



const socketContainer = new Container()

socketContainer.bind(INTERFACE_TYPE.SocketChat).to(SocketChat)


export {socketContainer}