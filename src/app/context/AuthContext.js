'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const nowLocation = typeof window !== 'undefined' ? window.location.pathname : '';
  const isLoginPage = nowLocation === '/login' || nowLocation === '/register';
  
  // Check if current route is public (doesn't need authentication)
  const isPublicRoute = nowLocation.startsWith('/articles') || 
                       nowLocation.startsWith('/article/') ||
                       isLoginPage;
  
  const router = useRouter();

  const checkAuth = async () => {
    // Skip auth check for public routes
    if (isPublicRoute) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('/api/auth/me');
      if (res.status === 200) {
        setUser(res.data.user);
      } else {
        router.push('/login');
        setUser(null);
      }
    } catch (error) {
      if (!isLoginPage && !isPublicRoute) {
        router.push('/login');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
