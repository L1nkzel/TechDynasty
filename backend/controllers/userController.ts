import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import User from "../models/userModel";
import { UserAuthInfoRequest, UserTypes } from "../types";
import tokenGenerator from "../utils/tokenGenerator";

/* @desc   Authenticate a user and get token
 * @route  POST /api/users/login
 * @access Public */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user: UserTypes | null = await User.findOne({ email }); // find user by email in database

    if (user && (await user.matchPassword(password))) { // if user exists then send user data to frontend
        tokenGenerator(res, user._id);

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
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) { 
        res.status(400);
        throw new Error("User already exists");
    }
    // create new user in database
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        tokenGenerator(res, user._id);

        res.json({ // send user data to frontend
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

/* @desc   Logout user
 * @route  POST /api/users/logout
 * @access Public */
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("jwt", "", { // clear cookie with token in browser 
        httpOnly: true,
        expires: new Date(0),
    });

    res.json({ message: "Successfully logged out" });
});

/* @desc   Get user profile
 * @route  GET /api/users/profile
 * @access Private */
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const userReq = req as UserAuthInfoRequest;
    const user = await User.findById(userReq.user._id);

    if (user) {
        res.json({ // send user data to frontend
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

/* @desc   Update user profile
 * @route  PUT /api/users/profile
 * @access Private */
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const userReq = req as UserAuthInfoRequest;

    const user = await User.findById(userReq.user._id);

    if (user) { // if user exists then update user data
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if (req.body.password) { // if password is not modified then skip encrypting
            user.password = req.body.password;
        }
        
        const updatedUser = await user.save(); // save updated user data to database

        res.json({ // send updated user data to frontend
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

/* @desc   Get all users
 * @route  GET /api/users
 * @access Private/Admin */
const getUsers = asyncHandler(async (req: Request, res: Response) => {
    res.send("get users");
});

/* @desc   Get user by ID
 * @route  GET /api/users/:id
 * @access Private/Admin */
const getUserById = asyncHandler(async (req: Request, res: Response) => {
    res.send("get user by id");
});

/* @desc   Delete user
 * @route  DELETE /api/users/:id
 * @access Private/Admin */
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    res.send("delete user");
});

/* @desc   Update user
 * @route  PUT /api/users/:id
 * @access Private/Admin */
const updateUser = asyncHandler(async (req: Request, res: Response) => {
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


