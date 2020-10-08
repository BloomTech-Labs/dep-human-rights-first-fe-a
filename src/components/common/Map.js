import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';
import supercluster from 'supercluster';
import mapboxgl from 'mapbox-gl';

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

  // -------------------- working on clusters-------

  // // points.forEach((point, index) => (point.id = index));

  // console.log(apiMarkerTest)
  // const style = {
  //     width: '20px',
  //     height: '20px',
  //     color: '#fff',
  //     background: '#1978c8',
  //     borderRadius: '20px',
  //     textAlign: 'center'
  // };

  // const ClusterMarker = ({ longitude, latitude, pointCount }) => {
  //     return (
  //         <Marker
  //             longitude={longitude}
  //             latitude={latitude}
  //         >
  //             <div style={{ ...style, background: '#f28a25' }}>{pointCount}</div>
  //         </Marker>
  //     )
  // }

  // ----------- remaking map????

  const bounds = [
    [-127.265625, 25.244696],
    [-64.6875, 50.064192],
  ];

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'map',
    // style: "mapbox://styles/martaalicja1/ckfx37li7117819paqxl1cp6x", // stylesheet location
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-95.712891, 37.09024], // starting position [lng, lat]
    zoom: 4, // starting zoom
    maxBounds: bounds, // Sets bounds as max
  });

  // const markers = apiMarkerTest.map(point => {
  //         new mapboxgl.Marker()
  //         .setLngLat([parseFloat(point.longitude), parseFloat(point.latitude)])
  //         .addTo(map);
  // });

  // --------- clusters????
  const points = apiMarkerTest.map(incident => {
    return {
      features: [
        {
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(incident.longitude),
              parseFloat(incident.latitude),
            ],
          },
          type: 'Feature',
          properties: {},
        },
      ],
    };
  });

  // const geojson = apiMarkerTest.map(incident => ({

  //         "geometry": {
  //         "type": "Point",
  //         "coordinates": [
  //         parseFloat(incident.longitude),
  //         parseFloat(incident.latitude),
  //         ]
  //         },
  //         "type": "Feature",
  //         "properties": {}
  // }))

  const geojson = apiMarkerTest.map(incident => ({
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(incident.longitude),
        parseFloat(incident.latitude),
      ],
    },
    type: 'Feature',
    properties: {},
  }));

  const hardcoded = {
    coords: [
      {
        geometry: {
          type: 'Point',
          coordinates: [-73.9502261503, 40.8270435498],
        },
        type: 'Feature',
        properties: {},
      },
      {
        geometry: {
          type: 'Point',
          coordinates: [-73.9451580005, 40.8026839999],
        },
        type: 'Feature',
        properties: {},
      },
    ],
  };

  // console.log(geojson)

  // const coords = apiMarkerTest.map( incident => {
  //     "
  // })

  // {
  //     "geometry": {
  //     "type": "Point",
  //     "coordinates": [
  //     -76.935256783,
  //     38.9081784965
  //     ]
  //     },
  //     "type": "Feature",
  //     "properties": {
  //     "description": "Deanwood",
  //     "marker-symbol": "rail-metro",
  //     "title": "Deanwood",
  //     "url": "http://www.wmata.com/rider_tools/pids/showpid.cfm?station_id=65",
  //     "lines": [
  //     "Orange"
  //     ],
  //     "address": "4720 Minnesota Avenue NE, Washington, DC 20019"
  //     }
  //     },

  map.on('load', function() {
    // Add a new source in a geojson format
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('incidents', {
      type: 'geojson',
      // data: { features: geojson },
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
      cluster: false,
      // clusterMaxZoom: 14, // Max zoom to cluster points on
      // clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    }); // end of add Source

    // map.addLayer({
    //     id: 'clusters',
    //     type: 'circle',
    //     source: 'incidents',
    //     filter: ['has', 'point_count'],
    //     paint: {
    //         // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    //         // with three steps to implement three types of circles:
    //         //   * Blue, 20px circles when point count is less than 100
    //         //   * Yellow, 30px circles when point count is between 100 and 750
    //         //   * Pink, 40px circles when point count is greater than or equal to 750
    //         'circle-color': [
    //             'step',
    //             ['get', 'point_count'],
    //             '#51bbd6',
    //             100,
    //             '#f1f075',
    //             750,
    //             '#f28cb1'
    //         ],
    //         'circle-radius': [
    //             'step',
    //             ['get', 'point_count'],
    //             20,
    //             100,
    //             30,
    //             750,
    //             40
    //         ]

    //     }
    // }) // end of layer

    // map.addLayer({
    //     id: 'cluster-count',
    //     type: 'symbol',
    //     source: 'incidents',
    //     filter: ['has', 'point_count'],
    //     layout: {
    //         'text-field': '{point_count_abbreviated}',
    //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    //         'text-size': 12
    //     }
    // }) // end of layer

    // // single point:
    // map.addLayer({
    //     id: 'unclustered-point',
    //     type: 'circle',
    //     source: 'incidents',
    //     filter: ['!', ['has', 'point_count']],
    //     paint: {
    //         'circle-color': '#11b4da',
    //         'circle-radius': 4,
    //         'circle-stroke-width': 1,
    //         'circle-stroke-color': '#fff'
    //     }
    // });

    // // we can change it to an icon if we'd like using:
    // // Add a symbol layer
    // // map.addLayer({
    // //     'id': 'symbols',
    // //     'type': 'symbol',
    // //     'source': 'points',
    // //     'layout': {
    // //     'icon-image': 'custom-marker'
    // //     }
    // //     });

    // // inspect a cluster on click ---> needs work -- everything below doesnt work
    // map.on('click', 'clusters', function (e) {
    //     console.log(e)
    //     const features = map.queryRenderedFeatures(e.point.a, {
    //         layers: ['clusters']
    //     });
    //     console.log(features[0])
    //     const clusterId = features[0].properties.cluster_id;
    //     map.getSource('incidents').getClusterExpansionZoom(
    //         clusterId,
    //         function (err, zoom) {
    //             if (err) return;

    //             map.easeTo({
    //                 center: features[0].geometry.coordinates,
    //                 zoom: zoom
    //             });
    //         }
    //     );
    // });

    // map.on('mouseenter', 'clusters', function () {
    //     map.getCanvas().style.cursor = 'pointer';
    // });
    // map.on('mouseleave', 'clusters', function () {
    //     map.getCanvas().style.cursor = '';
    // });

    // heatmap????
    map.addLayer({
      id: 'incidents',
      source: 'incidents',
      type: 'heatmap',
      paint: {
        'heatmap-radius': 30,
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)',
        ],
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'mag'],
          0,
          0,
          6,
          1,
        ],
        // "heatmap-weight": {
        //     type: "identity",
        //     property: "point_count"
        // },
        // "heatmap-opacity": {
        //     default: 1
        // }
      },
    });
  }); // end of main map.on()

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
        {/* --my location marker-- */}
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
        {/* --API markers-- */}
        {/* {loadAPIMarkers()} */}

        {/* --Cluster points-- */}
        {/* <Cluster radius={40} extent={512} nodeSize={64} component={ClusterMarker}>
    {points.map(point => (
      <Marker
        // key={point.id}
        longitude={point.geometry.coordinates[0]}
        latitude={point.geometry.coordinates[1]}
      >
        <div style={style} />
      </Marker>
    ))}
  </Cluster> */}
      </ReactMapGL>
    </div>
  );
};

export default Map;
