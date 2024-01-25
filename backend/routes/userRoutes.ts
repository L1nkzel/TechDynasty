import express from "express";

const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser,
    logoutUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from "../controllers/userController";
import { protect, admin } from "../middleware/authMiddleware";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/profile")
    .get(protect, getUserProfile) 
    .put(protect, updateUserProfile);
router.route("/:id")
.get(protect, admin, getUserById)
.delete(protect, admin, deleteUser)
.put(protect, admin, updateUser);


export default router;