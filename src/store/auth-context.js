import React, { useState } from 'react';

const AuthContext = React.createContext({
  search: '',
  token: '',
  isSignedIn: false,
  signIn: token => {},
  singOut: () => {},
  searchGame: (search) => {}, 
})

export const AuthContextProvider = props => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const initialSearch = localStorage.getItem('search');
  const [search, setSearch] = useState(initialSearch);

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
    console.log(`inside searchGameHandler: ${newSearch}`);
    setSearch(newSearch);
    localStorage.setItem('search', search);
  };

  const contextValue = {
    search: search,
    token: token,
    isSignedIn: userIsSignedIn,
    signIn: signInHandler,
    singOut: signOutHandler,
    searchGame: searchGameHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
