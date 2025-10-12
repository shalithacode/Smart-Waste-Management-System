export const getLocationName = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      return data.results[3].formatted_address; // Full address
    } else {
      console.error("No results found for this location.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching location name:", error);
    return null;
  }
};
