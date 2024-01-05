import { useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

export const useAuthProvider = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('AuthContext used outside provider');

  return context;
};
