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

const emptyList = [];

const singleBlogList = [
  {
    title: 'Loneliness',
    authors: 'Sola No',
    url: 'Ouais',
    likes: 9
  }
];

const postWithoutLikes = {
  title: 'Undesirable',
  authors: 'Your enemy',
  url: 'NO MORE'
};

const postWithoutTitle = {
  authors: 'Inconnu',
  url: 'Atteint',
  likes: 4
};

const multiBlogList = [
  {
    title: 'String',
    authors: 'String',
    url: 'String',
    likes: 3
  },
  {
    title: 'Guten tag',
    authors: 'Tralali',
    url: 'Line',
    likes: 7
  },
  {
    title: 'Satori',
    authors: 'Surprise',
    url: 'We',
    likes: 11
  }

];

const longerBlogList = [
  {
    title: 'String',
    authors: 'String',
    url: 'String',
    likes: 3
  },
  {
    title: 'Guten tag',
    authors: 'Tralali',
    url: 'Line',
    likes: 7
  },
  {
    title: 'Satori',
    authors: 'Surprise',
    url: 'We',
    likes: 11
  },
  {
    title: 'Chalamanka',
    authors: 'Surprise',
    url: 'Yaso',
    likes: 21
  },
  {
    title: 'COCACACA',
    authors: 'Tralali',
    url: 'L',
    likes: 1
  },
  {
    title: 'JAVAS',
    authors: 'Tralali',
    url: 'DOUKIPUDONTAN',
    likes: 9
  }
];

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  emptyList,
  singleBlogList,
  multiBlogList,
  longerBlogList,
  postWithoutLikes,
  postWithoutTitle
};
