import "reflect-metadata"
import http from "http"
import express, { Application } from "express"
import App from "./api"
import config from "./config";
import { closeConnections } from "./db";
import { socketContainer } from "./container/socketChat";
import { SocketChat } from "./libs/socketChat";
import { INTERFACE_TYPE } from "./utils";
import { initializeModels } from "./models";


async function ServerStart() {
   try {

      const socketChat = socketContainer.get<SocketChat>(INTERFACE_TYPE.SocketChat)
      
      const app: Application = express();
// await initializeModels()
      await App(app)

      const server = http.createServer(app)

      socketChat.initialize(server)

      server.listen(config.PORT, () => {
         console.log(`Server is running on port ${config.PORT}`)
      })

   } catch (error) {
      console.error('Error initializing application:', error);
      await closeConnections();
      process.exit(1);
   }

}


ServerStart();