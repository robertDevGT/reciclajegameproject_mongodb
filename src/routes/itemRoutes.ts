import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from '../middleware/validation';
import { ItemControlller } from '../controllers/ItemController';
import { validateCategoryExists } from '../middleware/category';

const router = Router();

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

export default router;