import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import categoryRoutes from "./routes/categoryRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

//routes
app.use('/api/categories', categoryRoutes);


export default app;