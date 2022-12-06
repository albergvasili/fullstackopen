const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/list_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.multiBlogList);
});

test('GET request returns the correct amount of posts', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body).toHaveLength(helper.multiBlogList.length);
});

test('Unique identifier property of a post is named "id"', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
