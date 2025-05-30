import type { Request, Response } from "express";
import Category from "../models/Category";

export class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    try {
      await Category.create(req.body);
      res.status(201).send("Categoria Creada Correctamente");
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

  static getCategoryById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        res.status(404).send("Categoría no encontrada");
        return;
      }

      res.json(category);
    } catch (error) {
      console.log(error);
    }
  };

  static updateCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        res.status(404).send("Categoría no encontrada");
        return;
      }

      await category.updateOne(req.body);
      res.status(201).send("Categoría Actualizada Correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        res.status(404).send("Categoría no encontrada");
        return;
      }
      await category.deleteOne();
      res.status(201).send("Categoría Eliminada Correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
