const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const helper = require('../utils/list_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.multiBlogList);
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('GET method', () => {
  test('GET request returns the correct amount of posts', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(helper.multiBlogList.length);
  });

  test('Unique identifier property of a post is named "id"', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body[0].id).toBeDefined();
  });
});

describe('POST method', () => {
  test('succesfully creates a new blog post', async () => {
    const post = helper.singleBlogList[0];

    const token = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    await api
      .post('/api/blogs')
      .send(post)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');

    const titles = res.body.map(blog => blog.title);

    expect(res.body).toHaveLength(helper.multiBlogList.length + 1);
    expect(titles).toContain(helper.singleBlogList[0].title);
  });

  test('"Likes" property defaults to 0 if missing', async () => {
    const post = helper.postWithoutLikes;

    const token = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    expect(post.likes).not.toBeDefined();

    await api
      .post('/api/blogs')
      .send(post)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const res = await api.get('/api/blogs');

    expect(res.body[res.body.length - 1].likes).toEqual(0);
  });

  test('Status 400 is sent when "title" or "url" are missing', async () => {
    const post = helper.postWithoutTitle;

    const token = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    await api
      .post('/api/blogs')
      .send(post)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(400);
  });
});

describe('DELETE method', () => {
  test('returns 204 when successful', async () => {
    const post = helper.singleBlogList[0];

    const token = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' });

    const newPost = await api
      .post('/api/blogs')
      .send(post)
      .set('Authorization', `bearer ${token.body.token}`);

    const postsBefore = await api.get('/api/blogs');

    await api
      .delete(`/api/blogs/${newPost.body.id}`)
      .set('Authorization', `bearer ${token.body.token}`)
      .expect(204);

    const postsAfter = await api.get('/api/blogs');

    expect(postsAfter.body).toHaveLength(postsBefore.body.length - 1);
  });
});

describe('PUT method', () => {
  test('Succesfully update the information of a post', async () => {
    const posts = await api.get('/api/blogs');
    const newLikes = { likes: 56 };

    await api
      .put(`/api/blogs/${posts.body[0].id}`)
      .send(newLikes)
      .expect(200);

    const updatedPosts = await api.get('/api/blogs');
    expect(updatedPosts.body[0].likes).toEqual(newLikes.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
