import jwt from "jsonwebtoken";

// generate token for user after successful login
const tokenGenerator = (res: any, userId: string) => {
    const token = jwt.sign({ userId }, process.env.
        JWT_SECRET!,
        { expiresIn: "30d" });

    // set cookie with token in browser
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // set secure to true if in production mode else false
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
};

export default tokenGenerator;
