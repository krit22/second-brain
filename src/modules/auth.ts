import { NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken"


export const auth: RequestHandler = (req, res, next) => {
    const header = req.headers

    if (!header.token) {
        res.json({
            message: "No token found"
        })
        return
    }

    const token: string = header.token as string
    try {
        const { _user_objectId }: any = jwt.verify(token, process.env.JWT_SECRET as string)
        req.currentUserid = _user_objectId

        next()
    } catch (e) {
        res.json({
            message: "Could not verify JWT",
            error: e
        })
    }
    return

}