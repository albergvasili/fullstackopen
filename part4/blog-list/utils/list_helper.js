const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, blogs) => {
    return accumulator + blogs.likes;
  };

  return blogs.reduce(reducer, 0);
};

module.exports = {
  dummy,
  totalLikes
};
