import { useSearchParams } from 'react-router-dom';

const useUrlPosition = () => {
  const [searchParams] = useSearchParams();

  // current coordinates
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));

  return [lat, lng];
};

export default useUrlPosition;
