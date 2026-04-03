"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const header = req.headers;
    if (!header.token) {
        res.json({
            message: "No token found"
        });
        return;
    }
    const token = header.token;
    try {
        const { _user_objectId } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.currentUserid = _user_objectId;
        next();
    }
    catch (e) {
        res.json({
            message: "Could not verify JWT",
            error: e
        });
    }
    return;
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map