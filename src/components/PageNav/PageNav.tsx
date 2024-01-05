import { NavLink } from 'react-router-dom';

import { useAuthProvider } from '@/hooks/useAuthProvider';
import Logo from '@components/Logo/Logo';

import Button from '../Button/Button';

import styles from './PageNav.module.css';

const PageNav: React.FC = () => {
  const { isAuthenticated, logout } = useAuthProvider();

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <Button purpose="primary" onClick={logout}>
              Logout
            </Button>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
