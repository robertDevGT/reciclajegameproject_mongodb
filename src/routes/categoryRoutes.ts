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



/**
 * 
 * @swagger
 * /api/categories:
 *      post:
 *          summary: Crea una nueva Categoria
 *          tags: 
 *              - Categories
 *          description: Returna un nuevo registro en la base de datos
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object      
 *                              properties: 
 *                                   categoryName:
 *                                      type: string
 *                                      example: Organico
 *          responses:
 *                200:
 *                  description: Categoria creada correctamente
 *                400:
 *                  description: Bad Request - Invalid Input Data
 *        
 */                            

router.post('/',
    body('categoryName').notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    handleInputErrors,
    CategoryController.createCategory
);

/**
 * 
 * @swagger
 * /api/categories:
 *      get:
 *          summary: Obtiene una lista de Categorias
 *          tags: 
 *              - Categories
 *          description: Retorna una lista de Categorias con los IDS de los Items Relacionados
 *          responses:
 *                200:
 *                  description: Respuesta Exitosa
 *                  content:
 *                        application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Category'
 *                500:
 *                  description: Respuesta Fallida
 */
router.get('/', CategoryController.getAllCategories);


/**
 * 
 * @swagger
 * /api/categories/{id}:
 *      get:
 *          summary: Obtiene una Categoria por su ID
 *          tags: 
 *              - Categories
 *          description: Retorna una Categoria por su ID
 *          parameters:
 *             - in: path
 *               name: id
 *               description: El ID de la Categoria a Obtener
 *               required: true
 *               schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Respuesta Extosa
 *                  content:
 *                      application/json:
 *                          schema:
 *                               $ref: '#/components/schemas/Category'
 *              404:
 *                 description: No Encontrado
 *              500:
 *                 description: Error de Servidor
 */
router.get('/:id', CategoryController.getCategoryById);

/**
 * 
 * @swagger
 * /api/categories/{id}:
 *      put:
 *          summary: Actualiza una Categoria
 *          tags: 
 *              - Categories
 *          description: Actualiza una Categoria por su ID
 *          requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object      
 *                              properties: 
 *                                   categoryName:
 *                                      type: string
 *                                      example: Organico
 *          parameters:
 *             - in: path
 *               name: id
 *               description: El ID de la Categoria a Obtener
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

router.put('/:id',
    body('categoryName').notEmpty().withMessage('El nombre de la categoria es obligatorio'),
    handleInputErrors,
    CategoryController.updateCategory);

/**
 * 
 * @swagger
 * /api/categories/{id}:
 *      delete:
 *          summary: Elimina una Categoria
 *          tags: 
 *              - Categories
 *          description: Elimina una Categoria Fisicamente de la Base de Datos
 *          parameters:
 *             - in: path
 *               name: id
 *               description: El ID de la Categoria a Obtener
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

router.delete('/:id', CategoryController.deleteCategory);


export default router;