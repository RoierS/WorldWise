import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { formatDate } from '@/helpers/formatDate';
import { useCitiesProvider } from '@/hooks/useCitiesProvider';

import ButtonBack from '@components/ButtonBack/ButtonBack';
import Spinner from '@components/Spinner/Spinner';

import styles from './City.module.css';
const City = () => {
  const { id } = useParams();
  const { getCurrentCity, currentCity, isLoading } = useCitiesProvider();
  const [isCurrentCityStale, setIsCurrentCityStale] = useState(true);

  useEffect(() => {
    if (id) getCurrentCity(id);
    setIsCurrentCityStale(false);

    return () => setIsCurrentCityStale(true);
  }, [id]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isCurrentCityStale || isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName}</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`} target="_blank" rel="noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
};

export default City;
