import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { initialUsers } from '../mock/seedData';

// Each demo account has the same password for the hackathon prototype
const DEMO_PASSWORD = 'demo1234';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  isLoggedIn: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, password: string) => boolean; // returns true on success
  logout: () => void;
  isQuickSwitchOpen: boolean;
  setIsQuickSwitchOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'agriconnect_current_role';
const LOGGED_IN_KEY = 'agriconnect_logged_in';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(ROLE_STORAGE_KEY);
    if (saved && (initialUsers as any)[saved]) return saved as UserRole;
    return 'farmer';
  });

  // Start as NOT logged in — user must go through the login page
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(LOGGED_IN_KEY) === 'true';
  });

  const [isQuickSwitchOpen, setIsQuickSwitchOpen] = useState(false);

  const currentUser = initialUsers[currentRole] || initialUsers.farmer;

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem(ROLE_STORAGE_KEY, role);
    setIsQuickSwitchOpen(false);
  };

  /**
   * Validates email + password against the demo accounts.
   * Returns true if credentials match, false otherwise.
   */
  const login = (email: string, password: string): boolean => {
    if (password !== DEMO_PASSWORD) return false;

    const matchedRole = (Object.keys(initialUsers) as UserRole[]).find(
      r => initialUsers[r].email.toLowerCase() === email.toLowerCase()
    );

    if (!matchedRole) return false;

    switchRole(matchedRole);
    setIsLoggedIn(true);
    localStorage.setItem(LOGGED_IN_KEY, 'true');
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(LOGGED_IN_KEY);
    setIsQuickSwitchOpen(false);
  };

  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, currentRole);
  }, [currentRole]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      currentRole,
      isLoggedIn,
      switchRole,
      login,
      logout,
      isQuickSwitchOpen,
      setIsQuickSwitchOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
