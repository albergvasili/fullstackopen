const listHelper = require('../utils/list_helper');

const emptyList = [];
const singleBlogList = [
  {
    title: 'Loneliness',
    authors: 'Sola No',
    url: 'Ouais',
    likes: 9
  }
];
const twoBlogList = [
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
  }
];

test('dummy returns one', () => {
  const result = listHelper.dummy(twoBlogList);
  expect(result).toBe(1);
});

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0);
  });

  test('of single blog list is the likes of that single blog', () => {
    expect(listHelper.totalLikes(singleBlogList)).toBe(9);
  });

  test('of a list with multiple blogs', () => {
    expect(listHelper.totalLikes(twoBlogList)).toBe(10);
  });
});

describe('Blog with most likes', () => {

  test('of single blog list is the single blog itself', () => {
    expect(listHelper.favoriteBlog(singleBlogList))
      .toEqual(singleBlogList[0]);
  });

  test('of a list with multiple blogs', () => {
    expect(listHelper.favoriteBlog(twoBlogList)).toEqual(twoBlogList[1]);
  });
});
