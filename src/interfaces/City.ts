import { DateType } from './DateType';

export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: DateType;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id?: number;
}
