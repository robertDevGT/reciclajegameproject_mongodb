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
export default router;