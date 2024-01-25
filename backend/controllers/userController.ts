import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { UserTypes } from "../types";

/* @desc   Authenticate a user and get token
 * @route  POST /api/users/login
 * @access Public */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 

    const user: UserTypes | null = await User.findOne({ email }); // find user by email in database

    if (user && (await user.matchPassword(password))) { // if user exists then send user data to frontend
       const token = jwt.sign({ userId: user._id }, process.env.
        JWT_SECRET!, 
        { expiresIn: "30d" });

        // set cookie with token in browser
        res.cookie("jwt", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", // set secure to true if in production mode else false
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});


/* @desc   Register a new user
 * @route  POST /api/users
 * @access Public */
const registerUser = asyncHandler(async (req, res) => {
    res.send("reg user");
});


/* @desc   Logout user
 * @route  POST /api/users/logout
 * @access Public */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.json({ message: "Successfully logged out" });
});


/* @desc   Get user profile
 * @route  GET /api/users/profile
 * @access Private */
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user profile");
});

/* @desc   Update user profile
 * @route  PUT /api/users/profile
 * @access Private */
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update user profile");
});

/* @desc   Get all users
 * @route  GET /api/users
 * @access Private/Admin */
const getUsers = asyncHandler(async (req, res) => {
    res.send("get users");
});

/* @desc   Get user by ID
 * @route  GET /api/users/:id
 * @access Private/Admin */
const getUserById = asyncHandler(async (req, res) => {
    res.send("get user by id");
});

/* @desc   Delete user
 * @route  DELETE /api/users/:id
 * @access Private/Admin */
const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete user");
});

/* @desc   Update user
 * @route  PUT /api/users/:id
 * @access Private/Admin */
const updateUser = asyncHandler(async (req, res) => {
    res.send("update user");
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
};


