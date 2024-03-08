import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import uploadImageRoutes from "./routes/uploadImageRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies 
app.use(cookieParser());

app.get("/", (req, res) => { // Test route 
  res.send("Api is running...");
});

// Routes 
app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/orders/', orderRoutes);
app.use('/api/upload/', uploadImageRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({clientId: process.env.PAYPAL_CLIENT_ID});
})

// Serve static files from the uploads folder
const currentDirectory = path.resolve(); 
app.use("/uploads", express.static(path.join(currentDirectory, "/uploads"))); 


// Error handlers 
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

