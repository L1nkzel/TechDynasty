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

// Encrypt password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // if password is not modified then skip encrypting 
        next();
    } else {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    };
})

const User = mongoose.model<UserTypes>('User', userSchema,);

export default User;