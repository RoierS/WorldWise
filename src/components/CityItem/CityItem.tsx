import { formatDate } from '@/helpers/formatDate';
import { ICity } from '@/interfaces/City';

import styles from './CityItem.module.css';

interface ICityItemProps {
  city: ICity;
}

const CityItem = ({ city }: ICityItemProps) => {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
};

export default CityItem;
