import { createContext, useEffect, useReducer } from "react";
import { createAction } from '../utils/reducer.utils'
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../services/firebase";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
      default: throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE)

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }
  
  useEffect(() => {
    const unsuscbribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsuscbribe;
  }, []);

  const value = { currentUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
