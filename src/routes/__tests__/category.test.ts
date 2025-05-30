import request from "supertest";
import server from "../../server";

describe('POST /api/categories', () => {
    test('should return validation errors', async () => {
        const response = await request(server).post('/api/categories').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.body.errors).not.toHaveLength(2);
    });

    test('should create a new category', async () => {
        const response = await request(server).post('/api/categories').send({ "categoryName": "Categoria Test" });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Categoria Creada Correctamente');

        expect(response.status).not.toBe(500);
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('GET  /api/categories', () => {
    test('should check if /api/categories exists', async () => {
        const response = await request(server).get('/api/categories');
        expect(response.status).not.toBe(404);
    });

    test('Get a JSON response with categories', async () => {
        const response = await request(server).get('/api/categories');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toBeInstanceOf(Array);

        expect(response.status).not.toBe(500);
    });
});

describe('GET  /api/categories/:id', () => {
    test('Should return an error for a non valid id', async () => {
        const categoryId = '6822d4b989a21baf525ecf14s';
        const response = await request(server).get(`/api/categories/${categoryId}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(200);
    });

    test('Should return a 404 response for a non-existent category', async () => {
        const categoryId = '6822d4b989a21baf525ecf14';
        const response = await request(server).get(`/api/categories/${categoryId}`);

        expect(response.status).toBe(404);
        expect(response.text).toBe('Categoría no encontrada');

        expect(response.status).not.toBe(200);
    });

    test('Should return a JSON response of a Category', async () => {
        const categoryId = '6839f586f7e837580f3566df';
        const response = await request(server).get(`/api/categories/${categoryId}`);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);

    });
});

describe('PUT  /api/categories/:id', () => {
    test('Should return an error for a non valid id', async () => {
        const categoryId = '6822d4b989a21baf525ecf13s';
        const response = await request(server).put(`/api/categories/${categoryId}`).send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(200);
    });

    test('Should return a 404 response for a non-existent category', async () => {
        const categoryId = '6822d4b989a21baf525ecf14';
        const response = await request(server).put(`/api/categories/${categoryId}`).send({ "categoryName": "Nombre de categoria" });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Categoría no encontrada');

        expect(response.status).not.toBe(200);
    });

    test('should return validation errors', async () => {
        const categoryId = '6822d4b989a21baf525ecf13';
        const response = await request(server).put(`/api/categories/${categoryId}`).send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
    });

    test('should update a category by categoryId', async () => {
        const categoryId = '6839f586f7e837580f3566df';
        const response = await request(server).put(`/api/categories/${categoryId}`).send({ "categoryName": "Categoria Test Updated" });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Categoría Actualizada Correctamente');

        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('DELETE  /api/categories/:id', () => {
    test('Should return an error for a non valid id', async () => {
        const categoryId = '6839311d37d0ab5223c969d1s';
        const response = await request(server).delete(`/api/categories/${categoryId}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(200);
    });

    test('Should return an 404 for a non-existant category', async () => {
        const categoryId = '6822d4b989a21baf525ecf14';
        const response = await request(server).delete(`/api/categories/${categoryId}`);

        expect(response.status).toBe(404);
        expect(response.text).toBe('Categoría no encontrada');

        expect(response.status).not.toBe(200);
    });


    test('Should delete a Category', async () => {
        const categoryId = '6839f586f7e837580f3566df';
        const response = await request(server).delete(`/api/categories/${categoryId}`);

        expect(response.status).toBe(201);
        expect(response.text).toBe('Categoría Eliminada Correctamente');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(500);
    });

});