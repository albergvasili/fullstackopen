const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res) => {
  const blog = await Blog.find({});
  res.json(blog);
});

blogRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findById('63a39d147564f828e059c6ba');

  if (!body.likes) {
    body['likes'] = 0;
  }

  if (body.title && body.url) {
    const blog = new Blog({
      title: body.title,
      authors: body.authors,
      url: body.url,
      likes: body.likes,
      user: user._id
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

  const blog = await Blog.findByIdAndRemove(id);
  if (blog) {
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
