import { createContext } from 'react';

export interface AuthContextType {
  authenticated: boolean;
  initialized: boolean;
  roles: string[];
  hasRole: (role: string) => boolean;
  login: () => void;
  register: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
