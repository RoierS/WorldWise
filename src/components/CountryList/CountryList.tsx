import { useCitiesProvider } from '@/hooks/useCitiesprovider';

import { ICountry } from '@/interfaces/Country';
import CountryItem from '@components/CountryItem/CountryItem';
import Spinner from '@components/Loader/Spinner';
import Message from '@components/Message/Message';

import styles from './CountryList.module.css';

const CountryList = () => {
  const { cities, isLoading } = useCitiesProvider();

  // creates arr with non-duplicates country
  const countries = cities.reduce((acc: ICountry[], currCity) => {
    if (!acc.map((el) => el.country).includes(currCity.country))
      return [...acc, { country: currCity.country, emoji: currCity.emoji }];
    else return acc;
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return <Message message="Add your first city by clicking on a city on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
