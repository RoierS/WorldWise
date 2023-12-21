import { useState } from 'react';

import Button from '../Button/Button';
import ButtonBack from '../ButtonBack/ButtonBack';

import styles from './Form.module.css';

type DateType = Date | string | number;

const Form: React.FC = () => {
  const [cityName, setCityName] = useState('');
  // const [country, setCountry] = useState('');
  const [date, setDate] = useState<DateType>(new Date());
  const [notes, setNotes] = useState('');

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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityname">City name</label>
        <input
          type="text"
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
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
