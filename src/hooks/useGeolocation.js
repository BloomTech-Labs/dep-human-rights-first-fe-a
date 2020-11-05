import { useState } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log('geolocation not supported');
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocation({ latitude, longitude });
  }

  function error(err) {
    console.log('Unable to retrieve your location');
  }

  return location;
};
