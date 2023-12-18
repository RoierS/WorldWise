import AppNav from '@components/AppNav/AppNav';
import Footer from '@components/Footer/Footer';
import Logo from '@components/Logo/Logo';

import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <Footer />
    </div>
  );
};

export default Sidebar;
