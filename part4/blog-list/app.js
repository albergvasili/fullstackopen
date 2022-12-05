const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.connect(config.mongoURL);

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

module.exports = app;
