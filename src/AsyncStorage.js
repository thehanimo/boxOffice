import AsyncStorage from '@react-native-community/async-storage';

storeBookmarks = async (bookmarks) => {
  try {
    await AsyncStorage.setItem('@bookmarks', bookmarks);
  } catch (e) {
    throw e;
  }
};

getStoredBookmarks = async () => {
  try {
    const value = await AsyncStorage.getItem('@bookmarks');
    return value;
  } catch (e) {
    throw e;
  }
};

export const bookmarkMovie = async (movie) => {
  let bookmarks = await getStoredBookmarks();
  if (!bookmarks) bookmarks = {};
  else bookmarks = JSON.parse(bookmarks);
  bookmarks[movie.imdbID] = movie;
  await storeBookmarks(JSON.stringify(bookmarks));
};

export const unbookmarkMovie = async (movie) => {
  let bookmarks = await getStoredBookmarks();
  if (!bookmarks) bookmarks = {};
  else bookmarks = JSON.parse(bookmarks);
  delete bookmarks[movie.imdbID];
  await storeBookmarks(JSON.stringify(bookmarks));
};

export const getBookmarks = async (movie) => {
  let bookmarks = await getStoredBookmarks();
  return JSON.parse(bookmarks);
};
