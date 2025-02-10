import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/apiAuth";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          throw new Error("User not found");
        }
        setUser(user);
        setIsLogged(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        setUser,
        user,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
