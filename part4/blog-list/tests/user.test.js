const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const api = supertest(app);

describe('Creating new users', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('Pyramidalis', 10);

    const newUser = new User({
      username: 'Imperator',
      name: 'Vitalis',
      passwordHash
    });

    await newUser.save();

  });

  const usersInDb = async () => {
    const users = await User.find({});
    return users.map(x => x.toJSON());
  };

  test('username and password are provided', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: '',
      name: 'Tralali',
      password: ''
    };


    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test('username and password are at least 3 characters long', async () => {
    const newUser = {
      username: 'AV',
      name: 'Tralali',
      password: 'Password'
    };


    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const users = await usersInDb();
    const usernames = users.map(x => x.username);

    expect(usernames).not.toContain(newUser.username);
  });

  test('username is unique', async () => {
    const newUser = {
      username: 'Imperator',
      name: 'Cesar',
      password: 'Password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(usersInDb).not.toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
