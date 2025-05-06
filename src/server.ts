import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import categoryRoutes from "./routes/categoryRoutes";
import itemRoutes from "./routes/itemRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

//routes
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);


export default app;