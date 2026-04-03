"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const connect_1 = require("./modules/connect");
const User_1 = require("./DB/Models/User");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 3);
        await User_1.User.create({
            username: username,
            password: hashedPassword
        });
        res.status(200).json({
            message: "Succrssfully registered the user",
            username,
        });
    }
    catch (e) {
        res.json({
            message: "Could not create the user",
            error: e
        });
        console.log("Could not create the user"),
            console.log(e);
    }
});
app.get("/signin", async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User_1.User.findOne({
        username
    });
    if (!currentUser) {
        res.json({
            message: "User not found"
        });
        return;
    }
    if (!(await bcryptjs_1.default.compare(password, currentUser.password))) {
        res.json({
            message: "incorrect password"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        username
    }, process.env.JWT_SECRET);
    res.json({
        message: "Logged in successfully...",
        token
    });
});
app.post("/api/v1/content", (req, res) => {
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3000, connect_1.startServer);
//# sourceMappingURL=index.js.map