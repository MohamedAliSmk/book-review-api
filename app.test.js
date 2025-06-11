const request = require('supertest');
const app = require('./server');

let token = '';

describe('Book Review API', () => {

  test('Task 1: Get all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Task 2: Get book by ISBN', async () => {
    const res = await request(app).get('/books/isbn/12345');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('isbn', '12345');
  });

  test('Task 3: Get books by Author', async () => {
    const res = await request(app).get('/books/author/Jane Doe');
    expect(res.statusCode).toBe(200);
  });

  test('Task 4: Get books by Title', async () => {
    const res = await request(app).get('/books/title/Node');
    expect(res.statusCode).toBe(200);
  });

  test('Task 5: Get book reviews', async () => {
    const res = await request(app).get('/books/review/12345');
    expect(res.statusCode).toBe(200);
  });

  test('Task 6: Register new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({ username: 'tester', password: '123456' });
    expect([200, 400]).toContain(res.statusCode); // 400 if user already exists
  });

  test('Task 7: Login user and get token', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ username: 'tester', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Task 8: Add review (protected)', async () => {
    const res = await request(app)
      .put('/books/review/12345')
      .set('Authorization', `Bearer ${token}`)
      .send({ review: 'Great Book!' });
    expect(res.statusCode).toBe(200);
  });

  test('Task 9: Delete review (protected)', async () => {
    const res = await request(app)
      .delete('/books/review/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test('Task 10: Get all books (async callback)', async () => {
    const res = await request(app).get('/async/callback');
    expect(res.statusCode).toBe(200);
  });

  test('Task 11: Get book by ISBN (promise)', async () => {
    const res = await request(app).get('/async/promise/12345');
    expect(res.statusCode).toBe(200);
  });

  test('Task 12: Get books by author (async)', async () => {
    const res = await request(app).get('/async/author/Jane Doe');
    expect(res.statusCode).toBe(200);
  });

  test('Task 13: Get books by title (async)', async () => {
    const res = await request(app).get('/async/title/Node');
    expect(res.statusCode).toBe(200);
  });
});
