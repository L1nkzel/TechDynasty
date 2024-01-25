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

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/profile")
    .get(getUserProfile)
    .put(updateUserProfile);
router.route("/:id")
.get(getUserById)
.delete(deleteUser)
.put(updateUser);


export default router;