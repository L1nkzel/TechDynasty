import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserTypes } from "../types";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, {
    timestamps: true,
});

// Check that password matches with hashed password in database
userSchema.methods.matchPassword = async function (passwordToCheck: string) {
    const isMatch = await bcrypt.compare(passwordToCheck, this.password);
    return isMatch; 
};

const User = mongoose.model<UserTypes>('User', userSchema,);

export default User;