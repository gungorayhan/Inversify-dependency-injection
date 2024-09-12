import { injectable } from "inversify";
import {Server as HttpServer} from "http"
import {Server, Socket} from "socket.io"

@injectable()
export class SocketChat{
    private io:Server

    initialize(server:HttpServer):void{
        this.io= new Server(server,{
            cors:{
                origin:"*",
            }
        })

        this.io.on("connection",(socket:Socket)=>{
            console.log("A user connected:", socket.id);

            socket.on('joinRoom', (room) => {
                socket.join(room);
                console.log(`User joined room: ${room}`);
              });

           
            socket.on("message", (data:any)=>{
                console.log("Message received: ", data.message);

                socket.to(data.room).emit("response","Message received!")
            })

            socket.on("disconnect",()=>{
                console.log("A user disconnect", socket.id);
            })
        })
    }

    
     public sendMessageToClient(clientId: string, message: string): void {
        const socket = this.io.sockets.sockets.get(clientId);
        if (socket) {
            socket.emit("customMessage", message);
        }
    }
}
