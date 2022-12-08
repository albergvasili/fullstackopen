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

test('POST request succesfully creates a new blog post', async () => {
  const post = helper.singleBlogList[0];

  await api
    .post('/api/blogs')
    .send(post)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');

  const titles = res.body.map(blog => blog.title);

  expect(res.body).toHaveLength(helper.multiBlogList.length + 1);
  expect(titles).toContain(helper.singleBlogList[0].title);
});

test('"Likes" property defaults to 0 if missing', async () => {
  const post = helper.postWithoutLikes;

  expect(post.likes).not.toBeDefined();

  await api
    .post('/api/blogs')
    .send(post)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const res = await api.get('/api/blogs');

  expect(res.body[res.body.length - 1].likes).toEqual(0);
});

test('Status 400 is sent when "title" or "url" are missing', async () => {
  const post = helper.postWithoutTitle;

  await api
    .post('/api/blogs')
    .send(post)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
