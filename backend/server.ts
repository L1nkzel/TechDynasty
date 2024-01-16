import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

// Routes 
app.use('/api/products/', productRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));

