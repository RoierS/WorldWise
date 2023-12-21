import { useEffect, useState } from 'react';

import { convertToEmoji } from '@/helpers/convertToEmoji';
import useUrlPosition from '@/hooks/useUrlPosition';
import ButtonBack from '@components//ButtonBack/ButtonBack';
import Button from '@components/Button/Button';
import Message from '@components/Message/Message';
import Spinner from '@components/Spinner/Spinner';

import styles from './Form.module.css';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

type DateType = Date | string | number;

const Form: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState<DateType>(new Date());
  const [notes, setNotes] = useState('');
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate: DateType = e.target.value;
    setDate(newDate);
  };

  const formattedDate = typeof date === 'string' ? date : date.toString().split('T')[0];

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(formattedDate);
  };

  // fetching city data in form
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error('Thats does not seem to be a city. Click somewhere else please 🤔');
        }

        setCityName(data.city || '');
        setCountry(data.countryName || '');
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        setGeocodingError(message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();

    return () => setGeocodingError('');
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner />;

  // when click not at city
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityname">City name</label>
        <input
          type="text"
          id="cityname"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={handleDateChange} value={formattedDate} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button purpose="primary">Add</Button>

        <ButtonBack />
      </div>
    </form>
  );
};

export default Form;
