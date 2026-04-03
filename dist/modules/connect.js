"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const mongoose_1 = __importDefault(require("mongoose"));
async function startServer() {
    console.log("Connecting to the server...");
    try {
        const then = new Date();
        await mongoose_1.default.connect(process.env.MONGODB_URL);
        const now = new Date();
        const timeTostart = (now.getTime() - then.getTime()) / 1000;
        console.log(`Connected to the database successfully in ${timeTostart} seconds`);
        console.log(`Running on port ${process.env.PORT}`);
    }
    catch (e) {
        console.log({
            message: "could not start the server",
            error: e
        });
    }
}
//# sourceMappingURL=connect.js.map