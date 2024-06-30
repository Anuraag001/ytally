import React, { createContext, useState, useContext } from 'react';

// Create a Context for user details
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({});

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
