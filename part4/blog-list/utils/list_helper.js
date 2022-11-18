const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, blog) => {
    return accumulator + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes
};
