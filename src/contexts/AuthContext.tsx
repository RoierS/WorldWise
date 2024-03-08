import { ReactNode, createContext, useReducer } from 'react';

interface IUser {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionTypes {
  LOGIN,
  LOGOUT,
}

type AppAction =
  | { type: ActionTypes.LOGIN; payload: IUser }
  | { type: ActionTypes.LOGOUT };

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: AuthState, action: AppAction) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case ActionTypes.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error('Unknown Action');
  }
};

const TEST_USER: IUser = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=t',
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const login = (email: string, password: string) => {
    if (email === TEST_USER.email && password === TEST_USER.password) {
      dispatch({ type: ActionTypes.LOGIN, payload: TEST_USER });
    }
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
