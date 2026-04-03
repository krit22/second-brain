import express from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { startServer } from "./modules/connect";
import { User } from "./DB/Models/User";
import { auth } from "./modules/auth";
import { RequestHandler } from "express";
import { Tag } from "./DB/Models/Tags";
import { HydratedDocument, Types } from "mongoose";
import mongoose from "mongoose"
import { Content } from "./DB/Models/content";

type TagDoc = {
    title: string
}

type inputData = {
    username: string,
    password: string
}

type contentInput = {
    type: string,
    link: string,
    title: string,
    tags: string[]
}

type ContentItem = {
    _id: Types.ObjectId;
    type: string;
    link: string; // or URL
    title: string;
    tags: Types.ObjectId[] | string[];
    userId: Types.ObjectId;
}

interface RootObject {
    content: ContentItem[];
}


dotenv.config()
const app = express();
app.use(express.json())

app.get("/signup", async (req, res) => {
    const { username, password }: inputData = req.body
    try {

        const hashedPassword = await bcrypt.hash(password, 3)

        await User.create({
            username: username,
            password: hashedPassword
        })

        res.status(200).json({
            message: "Succrssfully registered the user",
            username,
        })
    } catch (e) {
        res.json({
            message: "Could not create the user",
            error: e
        })
        console.log("Could not create the user"),
            console.log(e)
    }
})

app.get("/signin", async (req, res) => {
    const { username, password }: inputData = req.body

    const currentUser = await User.findOne({
        username
    })

    if (!currentUser) {
        res.json({
            message: "User not found"
        })
        return
    }

    if (!(await bcrypt.compare(password, currentUser.password as string))) {
        res.json({
            message: "incorrect password"
        })
        return
    }

    const token = jwt.sign({
        _user_objectId: currentUser._id
    }, process.env.JWT_SECRET as string)

    res.json({
        message: "Logged in successfully...",
        token
    })

})

app.use(auth)

app.post("/api/v1/content", async (req, res) => {
    const { type, tags, title, link }: contentInput = req.body;

    try {
        //get tags
        const tagObjectIds: Types.ObjectId[] = []
        for (const tag of tags) {
            console.log(`checking database for the tag ${tag}`)
            let tagDocument: HydratedDocument<TagDoc> = await Tag.findOne({
                title: tag
            })
            if (!tagDocument) {
                console.log(`Could not find the tag ${tag} in the DB. Adding it..`)
                tagDocument = await Tag.create({
                    title: tag
                })
            }

            tagObjectIds.push(tagDocument._id)
        }

        console.log(tagObjectIds)
        await Content.create({
            link,
            type,
            title,
            tags: tagObjectIds,
            userId: new mongoose.Types.ObjectId(req.currentUserid)
        })

        res.json({
            message: "Added your content successfully",
            user: req.currentUserid,
            title,
            tags
        })
    } catch (e) {
        res.json({
            message: "some error occured",
            error: e
        })
    }
})


app.get("/api/v1/content", async (req, res) => {
    try {
        const content: ContentItem[] = await Content.find({
            userId: new mongoose.Types.ObjectId(req.currentUserid) as Types.ObjectId
        }).lean()

        if (!content) {
            res.json({
                message: "No todos found"
            })
            return
        }


        let tagNames: string[] = []
        console.log("getting tagnames...")
        for (let document of content) {

            const tagArray = document.tags;
            for (let tagObjectId of tagArray) {
                const tagDocument: { _id: Types.ObjectId, title: string } = await Tag.findById(tagObjectId)
                const tagName: string = tagDocument.title.toString()
                tagNames.push(tagName)
            }
            console.log(tagNames)
            document.tags = tagNames
            tagNames = []
        }


        res.json({
            content
        })



    } catch (e) {
        res.json({
            message: "some error occured",
            error: e
        })
    }
})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000, startServer)
