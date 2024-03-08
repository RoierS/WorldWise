import { useEffect, useState } from 'react';

import { LatLngTuple } from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { useCitiesProvider } from '@/hooks/useCitiesProvider';
import { useGeolocation } from '@/hooks/useGeolocation';

import useUrlPosition from '@/hooks/useUrlPosition';
import Button from '@components/Button/Button';

import styles from './Map.module.css';

const MAP_TOKEN = import.meta.env.VITE_MAP_TOKEN;

const Map: React.FC = () => {
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0]);
  const [isPositionFound, setIsPositionFound] = useState(false);
  const [isDefault, setIsDefault] = useState(true);

  const { cities } = useCitiesProvider();
  const [lat, lng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // move map when click on city in citylist
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);

    return () => setIsPositionFound(false);
  }, [lat, lng]);

  // sets map position depends on geolocation
  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      setIsPositionFound(true);
    }

    return () => setIsPositionFound(false);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!isPositionFound && (
        <Button purpose="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <div className={styles.viewMode} onClick={() => setIsDefault(!isDefault)}>
        {isDefault ? (
          <img src="/satellite-icon.svg" alt="satellite view" />
        ) : (
          <img src="/default-map-icon.svg" alt="default view" />
        )}
      </div>

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
      >
        {isDefault ? (
          <TileLayer
            attribution='<a href="https://tomtom.com" target="_blank">&copy;  1992 - 2023 TomTom.</a> '
            url={`https://{s}.api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=${MAP_TOKEN}&tileSize=512`}
            subdomains="abcd"
          />
        ) : (
          <>
            <TileLayer
              attribution='<a href="https://tomtom.com" target="_blank">&copy;  1992 - 2023 TomTom.</a> '
              url={`https://{s}.api.tomtom.com/map/1/tile/sat/main/{z}/{x}/{y}.jpg?key=${MAP_TOKEN}&tileSize=512`}
              subdomains="abcd"
            />
            <TileLayer
              attribution='<a href="https://tomtom.com" target="_blank">&copy;  1992 - 2023 TomTom.</a> '
              url={`https://{s}.api.tomtom.com/map/1/tile/labels/main/{z}/{x}/{y}.png?key=${MAP_TOKEN}&tileSize=512`}
              subdomains="abcd"
            />
          </>
        )}

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />

        <ClickDetect />
      </MapContainer>
    </div>
  );
};

interface ChangeCenterProps {
  position: LatLngTuple;
}

// custom component for changing position of map
const ChangeCenter = ({ position }: ChangeCenterProps) => {
  const map = useMap();

  useEffect(() => {
    map.closePopup();
    map.flyTo(position, 10);
  }, [map, position]);

  return null;
};

// opens form when click on map
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
