const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const result = listHelper.dummy(listHelper.multiBlogList);
  expect(result).toBe(1);
});

describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(listHelper.emptyList)).toBe(0);
  });

  test('of single blog list is the likes of that single blog', () => {
    expect(listHelper.totalLikes(listHelper.singleBlogList)).toBe(9);
  });

  test('of a list with multiple blogs', () => {
    expect(listHelper.totalLikes(listHelper.multiBlogList)).toBe(21);
  });
});

describe('Blog with most likes', () => {

  test('of single blog list is the single blog itself', () => {
    expect(listHelper.favoriteBlog(listHelper.singleBlogList))
      .toEqual(listHelper.singleBlogList[0]);
  });

  test('of a list with multiple blogs', () => {
    expect(listHelper.favoriteBlog(listHelper.multiBlogList))
      .toEqual(listHelper.multiBlogList[2]);
  });
});

describe('Function mostBlogs', () => {
  test('returns the author with largest amount of blogs', () => {
    expect(listHelper.mostBlogs(listHelper.longerBlogList))
      .toBe('Tralali');
  });
});

describe('Function mostLikes', () => {
  test('returns the the author with largest amount of likes', () => {
    expect(listHelper.mostLikes(listHelper.longerBlogList))
      .toBe('Surprise');
  });
});
