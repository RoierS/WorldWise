import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button/Button';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import PageNav from '@components/PageNav/PageNav';

import styles from './Login.module.css';

const Login: React.FC = () => {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com');
  const [password, setPassword] = useState('qwerty');

  const { isAuthenticated, login } = useAuthProvider();
  const navigate = useNavigate();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>

          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button purpose="primary">Login</Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
