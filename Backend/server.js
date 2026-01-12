import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'

import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

try {
    const mongoConnect = mongoose.connect("mongodb://localhost:27017/posts")
    if(mongoConnect) {
        console.log("DB Conected !!")
    }
} catch(err) {
    console.log("Error Connecting DB")
}

// routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", postRoutes);

const PORT = process.env.PORT || 5555;
app.listen(PORT, () =>
    console.log(`Server running at http://127.0.0.1:${PORT}`)
);
