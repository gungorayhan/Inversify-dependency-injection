import express, { Application } from "express"
import "reflect-metadata"
import UserApp from "./api"
import config from "./config";
import { closeConnections } from "./db";


async function ServerStart() {
   try {
    const app: Application = express();

    await UserApp(app)

    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`)
    })

   } catch (error) {
     console.error('Error initializing application:', error);
        await closeConnections();
        process.exit(1);
   }
   
}


ServerStart();