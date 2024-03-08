import { useContext } from 'react';

import { CitiesContext } from '@/contexts/CitiesProvider';

export const useCitiesProvider = () => {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error(
      'CitiesContext was used outside of the export default CitiesProvider',
    );
  }

  return context;
};
