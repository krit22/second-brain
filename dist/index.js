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
const auth_1 = require("./modules/auth");
const Tags_1 = require("./DB/Models/Tags");
const mongoose_1 = __importDefault(require("mongoose"));
const content_1 = require("./DB/Models/content");
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
        _user_objectId: currentUser._id
    }, process.env.JWT_SECRET);
    res.json({
        message: "Logged in successfully...",
        token
    });
});
app.use(auth_1.auth);
app.post("/api/v1/content", async (req, res) => {
    const { type, tags, title, link } = req.body;
    try {
        //get tags
        const tagObjectIds = [];
        for (const tag of tags) {
            console.log(`checking database for the tag ${tag}`);
            let tagDocument = await Tags_1.Tag.findOne({
                title: tag
            });
            if (!tagDocument) {
                console.log(`Could not find the tag ${tag} in the DB. Adding it..`);
                tagDocument = await Tags_1.Tag.create({
                    title: tag
                });
            }
            tagObjectIds.push(tagDocument._id);
        }
        console.log(tagObjectIds);
        await content_1.Content.create({
            link,
            type,
            title,
            tags: tagObjectIds,
            userId: new mongoose_1.default.Types.ObjectId(req.currentUserid)
        });
        res.json({
            message: "Added your content successfully",
            user: req.currentUserid,
            title,
            tags
        });
    }
    catch (e) {
        res.json({
            message: "some error occured",
            error: e
        });
    }
});
app.get("/api/v1/content", async (req, res) => {
    try {
        const content = await content_1.Content.find({
            userId: new mongoose_1.default.Types.ObjectId(req.currentUserid)
        }).lean();
        if (!content) {
            res.json({
                message: "No todos found"
            });
            return;
        }
        let tagNames = [];
        console.log("getting tagnames...");
        for (let document of content) {
            const tagArray = document.tags;
            for (let tagObjectId of tagArray) {
                const tagDocument = await Tags_1.Tag.findById(tagObjectId);
                const tagName = tagDocument.title.toString();
                tagNames.push(tagName);
            }
            console.log(tagNames);
            document.tags = tagNames;
            tagNames = [];
        }
        res.json({
            content
        });
    }
    catch (e) {
        res.json({
            message: "some error occured",
            error: e
        });
    }
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3000, connect_1.startServer);
//# sourceMappingURL=index.js.map