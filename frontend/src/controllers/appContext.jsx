import React, { createContext, useContext } from "react";
const UserContext = createContext();
export const AppContext = ({ children }) => {
  const [api, setApi] = React.useState();
  const [user, setUser] = React.useState({});
  const [business, setBusiness] = React.useState({});
  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        app,
        setApp,
        setBusiness,
        business
      }}
    >
      {children}
      
    </UserContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(UserContext);
};
