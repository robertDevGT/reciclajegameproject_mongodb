import { connectDB } from "./config/db";
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import categoryRoutes from "./routes/categoryRoutes";
import itemRoutes from "./routes/itemRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { corsConfig } from "./config/cors";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors(corsConfig));

//routes
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

//Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;