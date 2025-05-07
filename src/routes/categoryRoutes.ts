import { Router } from 'express';
import { body } from 'express-validator';
import { CategoryController } from '../controllers/CategoryController';
import { handleInputErrors } from '../middleware/validation';

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Category:
 *                type: object
 *                properties:
 *                      id: 
 *                          type: MongoId
 *                          description: The Category ID
 *                          example: 68199751011f2b2f077f32ac
 *                      name:
 *                          type: string
 *                          description: The Category Name
 *                          example: Reciclable
 *                      items: 
 *                          type: list
 *                          description: Array ObjetcIds of Items
 *                          example: [68199751011f2b2f077f32ac,68199751011f2b2f077f32ac]
 */



router.post('/',
    body('categoryName').notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    handleInputErrors,
    CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategories);

router.get('/:id', CategoryController.getCategoryById);

router.put('/:id',
    body('categoryName').notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    handleInputErrors,
    CategoryController.updateCategory);

router.delete('/:id', CategoryController.deleteCategory);


export default router;