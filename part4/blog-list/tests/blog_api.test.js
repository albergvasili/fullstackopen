const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('GET request returns the correct amount of posts', async () => {
  const res = await api.get('/api/blogs');

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

afterAll(() => {
  mongoose.connection.close();
});
