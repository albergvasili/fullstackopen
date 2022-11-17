const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const emptyList = [];
  const singleBlogList = [
    {
      title: 'Loneliness',
      authors: 'Sola No',
      url: 'Ouais',
      likes: 9
    }
  ];

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0);
  });

  test('of single blog list is the likes of that single blog', () => {
    expect(listHelper.totalLikes(singleBlogList)).toBe(9);
  });
});
