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
 *                          description: El ID de la Categoria a la que Pertenece
 *                          example: 68199751011f2b2f077f32ac
 *                      imageUrl:
 *                          type: string
 *                          description: La imágen del Item
 *                          example: https//:www.google.com
 */

/**
 * 
 * @swagger
 * /api/items/{categoryId}:
 *      post:
 *          summary: Crea un Item
 *          tags: 
 *              - Items
 *          description: Crea un Item relacionado a una Categoria
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
 *                                   imageUrl:
 *                                      type: string
 *                                      example: https://www.google.com/cocacola.png
 *          parameters:
 *             - in: path
 *               name: categoryId
 *               description: El ID de la Categoria a la que Pertenece el Item
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


router.post('/:categoryId',
    body('itemName').notEmpty().withMessage('El nombre del item es obligatorio'),
    body('imageUrl').notEmpty().withMessage('La imágen del Item es obligatoria'),
    param('categoryId').isMongoId().withMessage('El ID no es válido'),
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
    param('categoryId').isMongoId().withMessage('El ID no es válido'),
    handleInputErrors,
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
    param('itemId').isMongoId().withMessage('El ID no es válido'),
    handleInputErrors,
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
    body('imageUrl').notEmpty().withMessage('La imágen del item es obligatoria'),
    param('itemId').isMongoId().withMessage('El ID no es válido'),
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