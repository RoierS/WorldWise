import { useState } from 'react';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useCitiesProvider } from '@/hooks/useCitiesProvider';

import styles from './Map.module.css';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

const Map: React.FC = () => {
  const navigate = useNavigate();
  const { cities } = useCitiesProvider();

  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer}>
      <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='<a href="https://tomtom.com" target="_blank">&copy;  1992 - 2023 TomTom.</a> '
          url={`https://{s}.api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${MAP_TOKEN}`}
          subdomains="abcd"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
