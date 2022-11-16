const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const Blog = require('./models/blog');
const blogRouter = require('./controllers/blog');


app.use('/api/blogs', blogRouter);

mongoose.connect(config.mongoURL);

app.use(cors());
app.use(express.json());


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
