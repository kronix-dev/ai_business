import React, { createContext, useContext } from "react";
const UserContext = createContext();
export const AppUserContext = ({ children }) => {
  const [app, setApp] = React.useState({
    name: "Acsolar",
    desription: "",
    logo: "uploads/acsolar.png",
    wallpaper: "uploads/wall.png",
    navbar: "sidebar",
  });
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
export const useUserContext = () => {
  return useContext(UserContext);
};
