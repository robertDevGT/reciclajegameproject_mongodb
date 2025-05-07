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

/**
 * 
 * @swagger
 * /api/items/{categoryId}:
 *      get:
 *          summary: Obtiene todos los items relacionados a una Categoria
 *          tags: 
 *              - Items
 *          description: Retorna un listado de Items relacionados a una Categoria
 *          parameters:
 *             - in: path
 *               name: id
 *               description: El ID de la Categoria 
 *               required: true
 *               schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Respuesta Extosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                               type: array
 *                               items:
 *                                   $ref: '#/components/schemas/Item'
 *              404:
 *                 description: No Encontrado
 *              500:
 *                 description: Error de Servidor
 */

router.get('/:categoryId',
    validateCategoryExists,
    ItemControlller.getItemsByCategory
);

/**
 * 
 * @swagger
 * /api/items:
 *      get:
 *          summary: Obtiene una lista random de 10 items
 *          tags: 
 *              - Items
 *          description: Obtiene una lista random de 10 items con su categoria
 *          responses:
 *                200:
 *                  description: Respuesta Exitosa
 *                  content:
 *                        application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Item'
 *                500:
 *                  description: Respuesta Fallida
 */

router.get('/',
    ItemControlller.getItems
);

/**
 * 
 * @swagger
 * /api/items/{itemId}/item:
 *      get:
 *          summary: Obtiene un Item por su ID
 *          tags: 
 *              - Items
 *          description: Retorna una Item por su ID
 *          parameters:
 *             - in: path
 *               name: id
 *               description: El ID del Item a Obtener
 *               required: true
 *               schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Respuesta Extosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/Item'
 *              404:
 *                 description: No Encontrado
 *              500:
 *                 description: Error de Servidor
 */
router.get('/:itemId/item',
    ItemControlller.getItemById
);


/**
 * 
 * @swagger
 * /api/items/{itemId}:
 *      put:
 *          summary: Actualiza un Item
 *          tags: 
 *              - Items
 *          description: Actualiza un Item por su ID
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object      
 *                              properties: 
 *                                   itemName:
 *                                      type: string
 *                                      example: Lata de Cocacola
 *          parameters:
 *             - in: path
 *               name: itemId
 *               description: El ID del Item a Modificar
 *               required: true
 *               schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Respuesta Exitosa
 *              404:
 *                 description: No Encontrado
 *              500:
 *                 description: Error de Servidor
 */

router.put('/:itemId',
    body('itemName').notEmpty().withMessage('El nombre del item es obligatorio'),
    handleInputErrors,
    ItemControlller.updateItem
);

/**
 * 
 * @swagger
 * /api/items/{categoryId}/{itemId}:
 *      delete:
 *          summary: Elimina un Item
 *          tags: 
 *              - Items
 *          description: Elimina un Item Fisicamente de la Base de Datos
 *          parameters:
 *             - in: path
 *               name: categoryId
 *               description: El ID de la Categoria a Obtener
 *               required: true
 *               schema:
 *                  type: string
 *             - in: path
 *               name: itemId
 *               description: El ID del Item a Obtener
 *               required: true
 *               schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Respuesta Exitosa
 *              404:
 *                 description: No Encontrado
 *              500:
 *                 description: Error de Servidor
 */

router.delete('/:categoryId/:itemId',
    param('categoryId').isMongoId().withMessage('ID de categoria no válido'),
    param('itemId').isMongoId().withMessage('ID de item no válido'),
    handleInputErrors,
    validateCategoryExists,
    ItemControlller.deleteItem
);

export default router;