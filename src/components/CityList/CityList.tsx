import { useCitiesProvider } from '@/hooks/useCitiesprovider';

import CityItem from '@components/CityItem/CityItem';
import Spinner from '@components/Loader/Spinner';
import Message from '@components/Message/Message';

import styles from './CityList.module.css';

const CityList = () => {
  const { cities, isLoading } = useCitiesProvider();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return <Message message="Add your first city by clicking on a city on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
