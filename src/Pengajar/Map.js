import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const LocationPicker = ({ setLocation }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      setLocation(e.latlng); // Set the selected location to the parent component
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png', iconSize: [25, 41] })} />
  );
};

const Map = ({ setLocation }) => {
  return (
    <MapContainer center={[-7.797068, 110.370529]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationPicker setLocation={setLocation} />
    </MapContainer>
  );
};

export default Map;
