import { ReactNode, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthProvider } from '@/hooks/useAuthProvider';

interface IProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
