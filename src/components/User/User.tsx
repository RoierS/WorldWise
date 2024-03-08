import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthProvider } from '@/hooks/useAuthProvider';

import styles from './User.module.css';
const User: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthProvider();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default User;
