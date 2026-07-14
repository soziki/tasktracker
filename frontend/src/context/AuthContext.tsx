import { createContext } from 'react';

export interface AuthContextType {
  authenticated: boolean;
  initialized: boolean;
  login: () => void;
  register: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
