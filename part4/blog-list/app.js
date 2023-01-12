const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');

mongoose.connect(config.mongoURL);

app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.json());


app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
