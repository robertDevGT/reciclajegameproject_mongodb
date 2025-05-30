import type { Request, Response } from "express";
import Item from "../models/Item";

export class ItemControlller {
    static createItem = async (req: Request, res: Response) => {
        try {
            const item = new Item(req.body);
            item.category = req.category.id;
            req.category.items.push(item.id);
            Promise.allSettled([item.save(), req.category.save()]);
            res.status(201).send("Item Creado Correctamente");
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    };

    static getItemsByCategory = async (req: Request, res: Response) => {
        try {
            const items = await Item.find({ category: req.category.id });
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    };

    static getItems = async (req: Request, res: Response) => {
        try {
            const items = await Item.aggregate([{ $sample: { size: 10 } }]);
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    };

    static getItemById = async (req: Request, res: Response) => {
        try {
            const { itemId } = req.params;
            const item = await Item.findById(itemId);

            if (!item) {
                res.status(404).send('Item no encontrado');
            }

            res.json(item);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    };



    static updateItem = async (req: Request, res: Response) => {
        try {
            const { itemId } = req.params;
            const item = await Item.findByIdAndUpdate(itemId, req.body);

            if (!item) {
                res.status(404).send('Item no encontrado');
            }

            res.status(201).send('Item actualizado correctamente')

        } catch (error) {
            res.status(500).send('Hubo un error')
        }
    };

    static deleteItem = async (req: Request, res: Response) => {
        try {
            const { itemId } = req.params;
            const item = await Item.findById(itemId);

            if (!item) {
                res.status(404).json({ error: 'Item no encontrado' });
            }

            req.category.items = req.category.items.filter(item => item.toString() !== itemId);

            await Promise.allSettled([item.deleteOne(), req.category.save()]);
            res.json('Item eliminado correctamente');

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    };
}

