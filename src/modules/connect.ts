import mongoose from "mongoose"

export async function startServer() {
    console.log("Connecting to the server...");

    try {
        const then = new Date();

        await mongoose.connect(process.env.MONGODB_URL as string)
        const now = new Date();
        const timeTostart: number = (now.getTime() - then.getTime()) / 1000

        console.log(`Connected to the database successfully in ${timeTostart} seconds`)
        console.log(`Running on port ${process.env.PORT}`)
    } catch (e) {
        console.log({
            message: "could not start the server",
            error: e
        })
    }
}