const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs);
    });
});

blogRouter.post('/', (req, res) => {
  const body = req.body;

  if (!body.likes) {
    body['likes'] = 0;
  }

  const blog = new Blog({
    title: body.title,
    authors: body.authors,
    url: body.url,
    likes: body.likes
  });

  blog
    .save()
    .then(result => {
      res.status(201).json(result);
    });
});

module.exports =  blogRouter;
