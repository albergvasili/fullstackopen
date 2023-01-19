const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blog = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 });

  res.json(blog);
});

blogRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    res.status(401).json({ error: 'Invalid token' });
  }
  if (!body.likes) {
    body.likes = 0;
  }
  if (body.title && body.url) {
    const blog = new Blog({
      title: body.title,
      authors: body.authors,
      url: body.url,
      likes: body.likes,
      user: user
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } else {
    res.status(400).end();
  }
});

blogRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const blog = await Blog.findById(id);

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  } else {
    res.status(418).end();
  }
});

blogRouter.put('/:id', async (req,res) => {
  const id = req.params.id;
  const body = req.body;

  const newBlog = {
    likes: body.likes
  };

  const blog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  if (blog) {
    res.status(200);
  }

  res.json(blog);
});

module.exports =  blogRouter;
