import { ICountry } from '@/interfaces/Country';

import styles from './CountryItem.module.css';

interface ICountryItemProps {
  country: ICountry;
}

const CountryItem = ({ country }: ICountryItemProps) => {
  return (
    <li className={styles.countryItem}>
      <p>{country.country}</p>
      <p>{country.emoji}</p>
    </li>
  );
};

export default CountryItem;
