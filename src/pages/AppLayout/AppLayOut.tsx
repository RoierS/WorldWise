import Map from '@/components/Map/Map';
import Sidebar from '@/components/Sidebar/Sidebar';

import User from '@/components/User/User';

import styles from './AppLayout.module.css';

const AppLayout: React.FC = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  );
};

export default AppLayout;
