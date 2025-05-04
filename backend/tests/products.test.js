// backend/tests/products.test.js
const request = require('supertest');
const app = require('../index');   // import the Express app

describe('Products API', () => {
  it('should fetch all products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should add a new product', async () => {
    const newProd = { name: 'Test Jest Prod', price: 123 };
    const post = await request(app)
      .post('/products')
      .send(newProd);

    expect(post.status).toBe(200);
    // supabase returns an array of inserted rows
    expect(post.body[0]).toMatchObject(newProd);

    const get = await request(app).get('/products');
    const names = get.body.map((p) => p.name);
    expect(names).toContain('Test Jest Prod');
  });
});
