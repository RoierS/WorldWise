import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useNavigate } from 'react-router-dom';

import { convertToEmoji } from '@/helpers/convertToEmoji';
import { useCitiesProvider } from '@/hooks/useCitiesProvider';
import useUrlPosition from '@/hooks/useUrlPosition';
import { ICity } from '@/interfaces/City';
import ButtonBack from '@components//ButtonBack/ButtonBack';
import Button from '@components/Button/Button';
import Message from '@components/Message/Message';
import Spinner from '@components/Spinner/Spinner';

import styles from './Form.module.css';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  const [lat, lng] = useUrlPosition();
  const { postNewCity, isLoading } = useCitiesProvider();
  const navigate = useNavigate();

  // handling adding new city to citylist
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: ICity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await postNewCity(newCity);
    navigate('/app/cities');
  };

  // fetching city data in form
  useEffect(() => {
    if (!lat && !lng) return;

    const fetchCityData = async () => {
      try {
        setGeocodingError('');
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const { countryCode, city, countryName } = await res.json();

        if (!countryCode || !city) {
          throw new Error(
            'Thats does not seem to be a city. Click somewhere else please 🤔',
          );
        }

        setCityName(city || '');
        setCountry(countryName || '');
        setEmoji(convertToEmoji(countryCode));
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

  if (!lat || !lng)
    return <Message message={'Start by clicking somewhere on map'} />;

  if (isLoadingGeocoding) return <Spinner />;

  // when click not at city
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          type="text"
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date as Date)}
          selected={date as Date}
          dateFormat={'dd/MM/yyyy'}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button purpose="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
};

export default Form;
