import "express";

declare global {
    namespace Express {
        interface Request {
            currentUserid?: string;
        }
    }
}