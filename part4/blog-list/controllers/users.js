const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  const users = await User.find({});
  const usernames = users.map(x => x.username);

  if (!(username && password)) {
    res.status(400).json({
      error: 'Username and password are required'
    });
    return;
  } else if (username.length <= 3 || password.length <= 3) {
    res.status(400).json({
      error: 'Username and password must be at leas 3 characters long'
    });
    return;
  } else {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      passwordHash
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  }

});

module.exports = usersRouter;
