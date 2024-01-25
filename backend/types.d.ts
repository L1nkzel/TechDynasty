import { Request } from "express"
import { Document } from "mongoose";

export interface UserTypes extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    matchPassword: (passwordToCheck: string) => Promise<boolean>;
}

export interface UserAuthInfoRequest extends Request {
  user: UserTypes;
}