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
  error: string | Error;
}

interface AppState {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity;
  error: string | Error;
}

enum ActionTypes {
  LOADING,
  CITIES_LOADED,
  CITY_LOADED,
  CITY_CREATED,
  CITY_DELETED,
  REJECTED,
}

type AppAction =
  | { type: ActionTypes.LOADING }
  | { type: ActionTypes.CITIES_LOADED; payload: ICity[] }
  | { type: ActionTypes.CITY_LOADED; payload: ICity }
  | {
      type: ActionTypes.CITY_CREATED;
      payload: ICity;
    }
  | {
      type: ActionTypes.CITY_DELETED;
      payload: number;
    }
  | { type: ActionTypes.REJECTED; payload: string };

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
    case ActionTypes.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.CITIES_LOADED:
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case ActionTypes.CITY_LOADED:
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case ActionTypes.CITY_CREATED:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case ActionTypes.CITY_DELETED:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(
          (city: ICity) => city.id !== action.payload,
        ),
        currentCity: initialState.currentCity,
      };
    case ActionTypes.REJECTED:
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
};

const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // post new city object to server, update cities state and current city state
  const postNewCity = async (newCity: ICity) => {
    dispatch({ type: ActionTypes.LOADING });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: ActionTypes.CITY_CREATED, payload: data });
    } catch (error) {
      const message = checkError(error);
      dispatch({ type: ActionTypes.REJECTED, payload: message });
    }
  };

  // delete city from server and update list of cities
  const deleteCity = async (id: number) => {
    dispatch({ type: ActionTypes.LOADING });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: ActionTypes.CITY_DELETED, payload: id });
    } catch (error) {
      const message = checkError(error);
      dispatch({ type: ActionTypes.REJECTED, payload: message });
    }
  };

  // fetch currentCity from server and set currentCity state
  const getCurrentCity = async (id: string) => {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: ActionTypes.LOADING });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: ActionTypes.CITY_LOADED, payload: data });
    } catch (error) {
      const message = checkError(error);
      dispatch({ type: ActionTypes.REJECTED, payload: message });
    }
  };

  // fetch cities from server and set cities state
  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: ActionTypes.LOADING });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data: ICity[] = await res.json();

        dispatch({ type: ActionTypes.CITIES_LOADED, payload: data });
      } catch (error) {
        const message = checkError(error);
        dispatch({ type: ActionTypes.REJECTED, payload: message });
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
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
