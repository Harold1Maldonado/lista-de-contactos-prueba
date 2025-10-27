import { createContext, useContext, useReducer } from "react";
import { initialState, storeReducer, actions } from "../store";

// useReducer centraliza el estado global dentro del Context API
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const storeActions = actions(dispatch);
  return (
    <GlobalContext.Provider value={{ state, dispatch, actions: storeActions }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalReducer = () => useContext(GlobalContext);
