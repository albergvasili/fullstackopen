const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, blog) => {
    return accumulator + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let topBlog = {};
  const reducer = (x, blog) => {
    if (blog.likes > x) {
      topBlog = blog;
      return blog.likes;
    } else {
      return x;
    }
  };
  blogs.reduce(reducer, 0);
  return topBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
