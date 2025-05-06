import type { Request, Response } from "express";
import Item from "../models/Item";

export class ItemControlller {
    static createItem = async (req: Request, res: Response) => {
        try {
            const item = new Item(req.body);
            item.category = req.category.id;
            req.category.items.push(item.id);
            Promise.allSettled([item.save(), req.category.save()]);
            res.send("Item Creado Correctamente");
        } catch (error) {
            console.log(error);
        }
    };
}