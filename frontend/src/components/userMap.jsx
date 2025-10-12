import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Map container style
const containerStyle = {
  width: '100%',
  height: '400px',
};

// Fallback map center (Sri Lanka's center)
const defaultCenter = {
  lat: 7.8731,
  lng: 80.7718,
};

const Map = ({ onLocationSelect, wasteRequests = [] }) => {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter); // Marker position for user location
  const [center, setCenter] = useState(defaultCenter); // Map center position

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Your Google Maps API Key
  });

  // Get user's current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
          if (onLocationSelect) {
            onLocationSelect({ latitude, longitude }); // Only call if the function exists
          }
        },
        (error) => {
          console.error('Error getting location: ', error);
        }
      );
    }
  }, [onLocationSelect]);

  // Handle map click to update marker position
  const onMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      if (onLocationSelect) {
        onLocationSelect({ latitude: lat, longitude: lng }); // Only call if the function exists
      }
    },
    [onLocationSelect]
  );

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12} // Zoom level when showing user's location
      onClick={onMapClick} // Update marker on map click
    >
      {markerPosition && <Marker position={markerPosition} />}

      {/* Display markers for waste requests */}
      {wasteRequests.map((request) => (
        <Marker
          key={request._id}
          position={{
            lat: request.location.latitude,
            lng: request.location.longitude,
          }}
          onClick={() => onLocationSelect && onLocationSelect(request.location)} // Only call if function exists
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
