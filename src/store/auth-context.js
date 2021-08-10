import React, { useState } from 'react';

const AuthContext = React.createContext({
  search: '',
  genre: '',
  token: '',
  isSignedIn: false,
  savedGames: [],
  signIn: token => {},
  signOut: () => {},
  searchGame: search => {},
  storeBookmarks: bookmarkedGames => {},
});

export const AuthContextProvider = props => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const initialSearch = localStorage.getItem('search');
  const [search, setSearch] = useState(initialSearch);

  const initialGenre = localStorage.getItem('genre');
  const [genre, setGenre] = useState(initialGenre);

  const initialBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const userIsSignedIn = !!token;

  const signInHandler = token => {
    setToken(token);
    localStorage.setItem('token', token);
  };
  const signOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const searchGameHandler = newSearch => {
    setSearch(newSearch);
    localStorage.setItem('search', search);
  };

  const searchGenreHandler = newGenre => {
    setGenre(newGenre);
    localStorage.setItem('genre', genre);
  };

  const storeBookmarksHandler = bookmarkedGames => {
    setBookmarks(bookmarkedGames);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  const contextValue = {
    search: search,
    token: token,
    isSignedIn: userIsSignedIn,
    savedGames: bookmarks,
    signIn: signInHandler,
    signOut: signOutHandler,
    searchGame: searchGameHandler,
    searchGenre: searchGenreHandler,
    storeBookmarks: storeBookmarksHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
