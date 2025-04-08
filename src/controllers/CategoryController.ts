import type { Request, Response } from "express";
import Category from "../models/Category";

export class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    try {
      await Category.create(req.body);
      res.send("Categoría Creada Correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find({});
      res.json(categories);
    } catch (error) {
      console.log(error);
    }
  };
}
