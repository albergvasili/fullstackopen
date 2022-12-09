const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blog = await Blog.find({});
  res.json(blog);
});

blogRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.likes) {
    body['likes'] = 0;
  }

  if (body.title && body.url) {
    const blog = new Blog({
      title: body.title,
      authors: body.authors,
      url: body.url,
      likes: body.likes
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);

  } else {
    res.status(400).end();
  }
});

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findByIdAndRemove(id);
  if (blog) {
    res.status(204).end();
  } else {
    res.status(418).end();
  }
});

module.exports =  blogRouter;
