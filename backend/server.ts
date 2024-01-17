import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware";

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

// Routes 
app.use('/api/products/', productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

