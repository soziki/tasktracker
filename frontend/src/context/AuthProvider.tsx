import React, { useEffect, useState } from 'react';
import keycloak from '../keycloak';
import { AuthContext } from './AuthContext';

// Keycloak instances can only be init()'d once. React StrictMode double-invokes
// effects in dev, so guard with a module-level flag rather than relying on the
// effect only running once per mount.
let initStarted = false;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (initStarted) return;
    initStarted = true;

    keycloak.onAuthLogout = () => setAuthenticated(false);
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).catch(() => keycloak.login());
    };

    keycloak
      .init({ onLoad: 'check-sso', pkceMethod: 'S256' })
      .then((isAuthenticated) => {
        setAuthenticated(isAuthenticated);
        setInitialized(true);
      })
      .catch(() => {
        setInitialized(true);
      });
  }, []);

  const login = () => keycloak.login();
  const register = () => keycloak.register();
  const logout = () => keycloak.logout({ redirectUri: window.location.origin });

  return (
    <AuthContext.Provider value={{ authenticated, initialized, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
