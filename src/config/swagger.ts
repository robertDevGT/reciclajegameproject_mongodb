import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Items',
                description: 'API Operations related to recycling items'
            },
        ],
        info: {
            title: 'REST API Proyecto de Reciclaje Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs"
        },
    },
    apis:['./src/routes/itemRoutes.ts','./src/routes/categoryRoutes.ts']
}

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec