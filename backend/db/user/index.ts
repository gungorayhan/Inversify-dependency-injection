import mongoose, { ConnectOptions } from "mongoose"
import config from "../../config"

export const connectToUserDatabase = async () => {
    try {
        const connection = await mongoose.connect(config.UserDatabaseURL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions
        )

    } catch (error) {
        console.log("DB Error: " + error)
    }
}
