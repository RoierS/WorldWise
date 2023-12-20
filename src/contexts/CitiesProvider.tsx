import { ReactNode, createContext, useEffect, useState } from 'react';

import { ICity } from '@/interfaces/City';

export interface ICitiesContext {
  cities: ICity[];
  isLoading: boolean;
}

interface CitiesProviderProps {
  children: ReactNode;
}

export const CitiesContext = createContext<ICitiesContext | undefined>(undefined);

const BASE_URL = 'http://localhost:9000';

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [cities, setCities] = useState([] as ICity[]);
  const [isLoading, setIsloading] = useState(false);

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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
