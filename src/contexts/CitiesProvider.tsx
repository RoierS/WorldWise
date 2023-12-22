import { ReactNode, createContext, useEffect, useState } from 'react';

import { ICity } from '@/interfaces/City';

interface ICitiesContext {
  cities: ICity[];
  setCities: (cities: ICity[]) => void;
  isLoading: boolean;
  currentCity: ICity;
  setCurrentCity: (city: ICity) => void;
  getCurrentCity: (id: string) => void;
  postNewCity: (city: ICity) => void;
}

interface CitiesProviderProps {
  children: ReactNode;
}

const BASE_URL = 'http://localhost:9000';

export const CitiesContext = createContext<ICitiesContext | undefined>(
  undefined,
);

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [cities, setCities] = useState([] as ICity[]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({} as ICity);

  // fetch cities from server and set cities state
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

  // fetch currentCity from server and set currentCity state
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
      setIsloading(false);
    }
  };

  // post new city object to server, update cities state and current city state
  const postNewCity = async (newCity: ICity) => {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
      setCurrentCity(data);
      setIsloading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setIsloading(false);
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
        setCities,
        postNewCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
