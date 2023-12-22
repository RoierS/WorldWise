import { ReactNode, createContext, useEffect, useReducer } from 'react';

import { checkError } from '@/helpers/checkError';
import { ICity } from '@/interfaces/City';

interface ICitiesContext {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  getCurrentCity: (id: string) => void;
  postNewCity: (city: ICity) => void;
  deleteCity: (id: number) => void;
}

interface AppState {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  error: string | Error;
}

type AppAction =
  | { type: 'loading' }
  | { type: 'cities/loaded'; payload: ICity[] }
  | { type: 'city/loaded'; payload: ICity }
  | {
      type: 'city/created';
      payload: ICity;
    }
  | {
      type: 'city/deleted';
      payload: number;
    }
  | { type: 'rejected'; payload: string };

interface CitiesProviderProps {
  children: ReactNode;
}

const BASE_URL = 'http://localhost:9000';

export const CitiesContext = createContext<ICitiesContext | undefined>(
  undefined,
);

const initialState = {
  cities: [] as ICity[],
  isLoading: false,
  currentCity: {} as ICity,
  error: '',
};

const reducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(
          (city: ICity) => city.id !== action.payload,
        ),
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
};

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // post new city object to server, update cities state and current city state
  const postNewCity = async (newCity: ICity) => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      const message = checkError(error);
      dispatch({ type: 'rejected', payload: message });
    }
  };

  // delete city from server and update list of cities
  const deleteCity = async (id: number) => {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      const message = checkError(error);
      dispatch({ type: 'rejected', payload: message });
    }
  };

  // fetch currentCity from server and set currentCity state
  const getCurrentCity = async (id: string) => {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      const message = checkError(error);
      dispatch({ type: 'rejected', payload: message });
    }
  };

  // fetch cities from server and set cities state
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data: ICity[] = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        const message = checkError(error);
        dispatch({ type: 'rejected', payload: message });
      }
    };

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        postNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
