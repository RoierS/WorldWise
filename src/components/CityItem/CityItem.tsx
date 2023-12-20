import { Link } from 'react-router-dom';

import { formatDate } from '@/helpers/formatDate';
import { useCitiesProvider } from '@/hooks/useCitiesProvider';
import { ICity } from '@/interfaces/City';

import styles from './CityItem.module.css';

interface ICityItemProps {
  city: ICity;
}

const CityItem = ({ city }: ICityItemProps) => {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity } = useCitiesProvider();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
