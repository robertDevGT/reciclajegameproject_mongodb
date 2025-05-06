import type { Request, Response, NextFunction } from "express";
import Category, { ICategory } from "../models/Category";


declare global {
    namespace Express {
        interface Request {
            category: ICategory
        }
    }
}

export async function validateCategoryExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);

        if (!category) {
            res.status(404).send("Categoría no encontrada");
            return;
        }

        req.category = category;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' });
    }
}