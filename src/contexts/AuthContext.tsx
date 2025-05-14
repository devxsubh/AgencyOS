// contexts/AuthContext.tsx
"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = Cookies.get('auth-token');
    if (token) {
      // In a real app, you would validate the token with your backend
      // For this example, we'll assume the token is valid and set a mock user
      setUser({
        id: '1',
        name: 'Wonder',
        email: 'wonder@example.com',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you would send a request to your backend
      // This is a mock implementation
      if (email === `${process.env.NEXT_PUBLIC_ADMIN_USERNAME}` && password === `${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}` ) {
        // Set mock user data
        const user = {
          id: '1',
          name: 'Wonder',
          email: email,
        };
        
        // Set cookie (in a real app, this would be a JWT token from your backend)
        Cookies.set('auth-token', 'mock-jwt-token', { expires: 7 });
        
        setUser(user);
        return;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('auth-token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}