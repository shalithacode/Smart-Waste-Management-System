// components/MapComponent.jsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ latitude, longitude }) => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyB0zc090Yi-GBjwOs7kG6iqVPR7XJPoDvo">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
