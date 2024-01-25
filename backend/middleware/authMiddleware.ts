import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import { NextFunction, Request, Response } from 'express';
import { UserAuthInfoRequest } from "../types";

// middleware to protect routes that require authentication from unauthorized users
const protectRoute = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decodedToken: JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            const user = await User.findById(decodedToken.userId).select("-password");
            if (user) {
                (req as UserAuthInfoRequest).user = user;
                next();
            } else {
                res.status(401);
                throw new Error("Not authorized, user not found");
            }
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
// middleware to protect routes that require admin access from unauthorized users
const adminRoute = (req: Request, res: Response, next: NextFunction) => {
    const userReq = req as UserAuthInfoRequest;
    if (userReq.user && userReq.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized as an admin");
    }
};

export { protectRoute as protect, adminRoute as admin };