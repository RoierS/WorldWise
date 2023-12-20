import { ReactNode, createContext, useEffect, useState } from 'react';

import { ICity } from '@/interfaces/City';

export interface ICitiesContext {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  setCurrentCity: (city: ICity) => void;
  getCurrentCity: (id: string) => void;
}

interface CitiesProviderProps {
  children: ReactNode;
}

export const CitiesContext = createContext<ICitiesContext | undefined>(undefined);

const BASE_URL = 'http://localhost:9000';

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [cities, setCities] = useState([] as ICity[]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({} as ICity);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data: ICity[] = await res.json();
        setCities(data);
        setIsloading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsloading(false);
      }
    };

    fetchCities();
  }, []);

  const getCurrentCity = async (id: string) => {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      setIsloading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCurrentCity,
        getCurrentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
