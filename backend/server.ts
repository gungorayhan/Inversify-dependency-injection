import express, { Application } from "express"
import "reflect-metadata"
import UserApp from "./api"
import config from "./config";
import { initDatabases } from './db';

async function ServerStart() {

    const app: Application = express();

    // const {userDB} = await initDatabases();

    await UserApp(app)

    app.listen(config.PORT, () => {
        console.log(`Server is running on port ${config.PORT}`)
    })

    // process.on('SIGINT', async () => {
    //     console.log('Closing MongoDB connections...');
    //     await userDB.close();
    //     process.exit(0);
    // });
}


ServerStart();