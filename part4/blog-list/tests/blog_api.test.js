const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/list_helper');

const api = supertest(app);

test('GET request returns the correct amount of posts', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body).toHaveLength(helper.multiBlogList.length);
});

afterAll(() => {
  mongoose.connection.close();
});
