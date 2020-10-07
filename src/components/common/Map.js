import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.09024,
    longitude: -95.712891,
    zoom: 4,
    width: '100vw',
    height: '76vh',
  });
  const [usersLocation, setUsersLocation] = useState({});
  // using a NYC API to get dummy data for display on the map
  // this will be replaced with our project's backend once it's ready
  const [apiMarkerTest, setApiMarkerTest] = useState([]);

  useEffect(() => {
    // -> showcase our data instantly from the api call
    fetchAPIPoints();
  }, []);

  // temporary fuction we will not use with our APi --> we dont want to get rid of any of our points
  const filterFreeWifi = hotspots => {
    return hotspots.filter(spot => {
      return spot.type === 'Free';
    });
  };
  const fetchAPIPoints = () => {
    axios
      .get(`https://data.cityofnewyork.us/resource/yjub-udmw.json`)
      .then(res => {
        const freeWifi = filterFreeWifi(res.data);
        setApiMarkerTest(freeWifi);
      });
  };
  console.log(apiMarkerTest);

  const loadAPIMarkers = () => {
    return apiMarkerTest.map(location => {
      return (
        <Marker
          key={location.objectid}
          latitude={parseFloat(location.latitude)}
          longitude={parseFloat(location.longitude)}
        >
          <i
            class="fa fa-map-marker"
            style={{
              color: 'RoyalBlue',
              'font-size': '2rem',
            }}
          />
        </Marker>
      );
    });
  };

  const setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      let newViewport = {
        height: '100vh',
        width: '100vw',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10,
      };
      setViewport(newViewport);
      setUsersLocation(setUserLocation);
    });
  };

  return (
    <div>
      <button onClick={setUserLocation}>My Location</button>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/martaalicja1/ckfx37li7117819paqxl1cp6x"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {/* location marker */}
        {Object.keys(usersLocation).length !== 0 ? (
          <Marker latitude={usersLocation.lat} longitude={usersLocation.long}>
            <i
              class="fa fa-map-marker"
              style={{
                color: 'RoyalBlue',
                'font-size': '2rem',
              }}
            />
            <div>My Location</div>
          </Marker>
        ) : null}
        {/* API markers */}
        {loadAPIMarkers()}
      </ReactMapGL>
    </div>
  );
};

export default Map;
