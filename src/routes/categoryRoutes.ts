import { Router } from 'express';
import { body } from 'express-validator';
import { CategoryController } from '../controllers/CategoryController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();

router.post('/',
    body('categoryName').notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    handleInputErrors,
    CategoryController.createCategory
);
router.get('/',CategoryController.getAllCategories);


export default router;