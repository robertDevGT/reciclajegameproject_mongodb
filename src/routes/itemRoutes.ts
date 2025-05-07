import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { ItemControlller } from '../controllers/ItemController';
import { validateCategoryExists } from '../middleware/category';

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Item:
 *                type: object
 *                properties:
 *                      id: 
 *                          type: MongoId
 *                          description: The Item ID
 *                          example: 68199751011f2b2f077f32ac
 *                      name:
 *                          type: string
 *                          description: The Item Name
 *                          example: Lata de jugo
 *                      categoryId:
 *                          type: mongoId
 *                          description: The Category Id that the Item Belongs To
 *                          example: 68199751011f2b2f077f32ac
 */

router.post('/:categoryId',
    body('itemName').notEmpty().withMessage('El nombre del item es obligatorio'),
    handleInputErrors,
    validateCategoryExists,
    ItemControlller.createItem
);

router.get('/:categoryId',
    validateCategoryExists,
    ItemControlller.getItemsByCategory
);

router.get('/',
    ItemControlller.getItems
);

router.get('/:itemId/item',
    ItemControlller.getItemById
);


router.put('/:itemId',
    body('itemName').notEmpty().withMessage('El nombre del item es obligatorio'),
    handleInputErrors,
    ItemControlller.updateItem
);

router.delete('/:categoryId/:itemId',
    param('categoryId').isMongoId().withMessage('ID de categoria no válido'),
    param('itemId').isMongoId().withMessage('ID de item no válido'),
    handleInputErrors,
    validateCategoryExists,
    ItemControlller.deleteItem
);

export default router;