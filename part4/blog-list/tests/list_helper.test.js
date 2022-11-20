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

test('dummy returns one', () => {
  const result = listHelper.dummy(multiBlogList);
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
    expect(listHelper.totalLikes(multiBlogList)).toBe(21);
  });
});

describe('Blog with most likes', () => {

  test('of single blog list is the single blog itself', () => {
    expect(listHelper.favoriteBlog(singleBlogList))
      .toEqual(singleBlogList[0]);
  });

  test('of a list with multiple blogs', () => {
    expect(listHelper.favoriteBlog(multiBlogList)).toEqual(multiBlogList[2]);
  });
});
