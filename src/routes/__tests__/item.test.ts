import request from "supertest";
import server from "../../server";

describe('POST /api/items/:categoryId', () => {
    test('should return an error for non valid categoryId', async () => {
        const categoryId = '683931250c5dda7648ef9c4bs';
        const response = await request(server).post(`/api/items/${categoryId}`).send({ "itemName": "New Item", "imageUrl": "google.com" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.body.errors).not.toHaveLength(2);
    });

     test('should return an 404 response for non-existant category', async () => {
        const categoryId = '6839311d37d0ab5223c969d2';
        const response = await request(server).post(`/api/items/${categoryId}`).send({ "itemName": "New Item", "imageUrl": "google.com" });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Categoría no encontrada');

        expect(response.status).not.toBe(200);
    });

    test('should return validation errors', async () => {
        const categoryId = '6839311d37d0ab5223c969d1';
        const response = await request(server).post(`/api/items/${categoryId}`).send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(200);
        expect(response.body.errors).not.toHaveLength(1);
        expect(response.body.errors).not.toHaveLength(3);
    });

    test('should create an item', async () => {
        const categoryId = '6839f586f7e837580f3566df';
        const response = await request(server).post(`/api/items/${categoryId}`).send({ "itemName": "New Item", "imageUrl": "google.com" });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Item Creado Correctamente');

        expect(response.status).not.toBe(500);
        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');

    });
});

describe('GET /api/items/:categoryId', () => {
    test('should return an error for non valid categoryId', async () => {
        const categoryId = '683931250c5dda7648ef9c4bs';
        const response = await request(server).get(`/api/items/${categoryId}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.body.errors).not.toHaveLength(2);
    });

    test('should return an 404 response for non-existant category', async () => {
        const categoryId = '6839311d37d0ab5223c969d2';
        const response = await request(server).get(`/api/items/${categoryId}`);

        expect(response.status).toBe(404);
        expect(response.text).toBe('Categoría no encontrada');

        expect(response.status).not.toBe(200);
        expect(response.text).not.toBe('');
    });

    test('should an array of Items', async () => {
        const categoryId = '6839f586f7e837580f3566df';
        const response = await request(server).get(`/api/items/${categoryId}`);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toBeInstanceOf(Array);

        expect(response.body).not.toBe(String);
        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(500);
    });
});


describe('GET /api/items/', () => {
    test('should return an array of items', async () => {
        const response = await request(server).get(`/api/items/`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.headers['content-type']).toMatch(/json/);

        expect(response.status).not.toBe(500);

    });
});

describe('GET /api/items/:itemId/item', () => {
    test('should return an error for non valid itemId', async () => {
        const itemId = '683937076c4cb3057a1b54dds';
        const response = await request(server).get(`/api/items/${itemId}/item`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);


        expect(response.status).not.toBe(200);
    });

    test('should return an 404 response for non-existant item', async () => {
        const itemId = '683937076c4cb3057a1b54d2';
        const response = await request(server).get(`/api/items/${itemId}/item`);

        expect(response.status).toBe(404);
        expect(response.text).toBe('Item no encontrado');

        expect(response.status).not.toBe(200);
        expect(response.text).not.toBe('');
    });

    test('should return an item', async () => {
        const itemId = '6822d5b789a21baf525ecf46';
        const response = await request(server).get(`/api/items/${itemId}/item`);

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);


        expect(response.status).not.toBe(404);
    });
});

describe('PUT /api/items/:itemId', () => {
    test('should return an error for non valid itemId', async () => {
        const itemId = '683937076c4cb3057a1b54dd2';
        const response = await request(server).put(`/api/items/${itemId}`).send({ "itemName": "New Name", "imageUrl": "newImage" });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);


        expect(response.status).not.toBe(200);
    });

    test('should return an 404 response for non-existant item', async () => {
        const itemId = '683937076c4cb3057a1b54d2';
        const response = await request(server).put(`/api/items/${itemId}`).send({ "itemName": "New Name", "imageUrl": "newImage" });

        expect(response.status).toBe(404);
        expect(response.text).toBe('Item no encontrado');

        expect(response.status).not.toBe(200);
        expect(response.text).not.toBe('');
    });

    test('should return validation errors', async () => {
        const itemId = '683937076c4cb3057a1b54dd';
        const response = await request(server).put(`/api/items/${itemId}`).send();

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);


        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(3);
    });

    test('should update an item', async () => {
        const itemId = '6839f53cc7ece0d12255d8b0';
        const response = await request(server).put(`/api/items/${itemId}`).send({ "itemName": "New Name", "imageUrl": "newImage" });

        expect(response.status).toBe(201);
        expect(response.text).toBe('Item actualizado correctamente');

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.text).not.toBe('');

    });
});