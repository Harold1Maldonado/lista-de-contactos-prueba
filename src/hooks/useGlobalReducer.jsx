import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, storeReducer, actions } from "../store";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const storeActions = actions(dispatch, state);

  
  useEffect(() => {
    const savedSlug = localStorage.getItem("selectedSlug");
    if (savedSlug) {
      storeActions.getSingleAgenda(savedSlug);
    }
  }, []); 

  return (
    <GlobalContext.Provider
      value={{ state, dispatch, actions: storeActions }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalReducer = () => useContext(GlobalContext);
