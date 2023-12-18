import { ICity } from '@/interfaces/City';

import CityItem from '@components/CityItem/CityItem';

import Spinner from '@components/Loader/Spinner';

import Message from '@components/Message/Message';

import styles from './CityList.module.css';

interface ICityListProps {
  cities: ICity[];
  isLoading: boolean;
}

const CityList = ({ cities, isLoading }: ICityListProps) => {
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
