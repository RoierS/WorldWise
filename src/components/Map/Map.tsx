import { useEffect, useState } from 'react';

import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useCitiesProvider } from '@/hooks/useCitiesProvider';

import styles from './Map.module.css';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

const Map: React.FC = () => {
  const { cities } = useCitiesProvider();

  const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0]);
  const [searchParams, setSearchParams] = useSearchParams();

  // current coordinates
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));

  // move map when click on city in citylist
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer className={styles.map} center={mapPosition} zoom={8} scrollWheelZoom={true}>
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
        {(lat || lng) && <ChangeCenter position={mapPosition} />}
        <ClickDetect />
      </MapContainer>
    </div>
  );
};

// cuctom component for changing position of map
interface ChangeCenterProps {
  position: LatLngTuple;
}

const ChangeCenter = ({ position }: ChangeCenterProps) => {
  const map = useMap();

  map.closePopup();
  map.flyTo(position, 10);
  return null;
};

const ClickDetect = () => {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
};

export default Map;
