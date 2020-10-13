import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as mapboxgl from 'mapbox-gl';
import statesDB from '../../database/states.json';
import { Button } from 'antd';
import myImg from '../../assets/police-badge.png';
import usZips from 'us-zips';

const Map = () => {
  // using a NYC API to get dummy data for display on the map
  // this will be replaced with our project's backend once it's ready
  const [apiMarkerTest, setApiMarkerTest] = useState([]);
  const [currentState, setCurrentState] = useState(
    statesDB.filter(state => {
      return state.state === 'Massachusetts';
    })
  );
  const [currentZip, setCurrentZip] = useState('02184');
  let scrollEnabled = false; // toggles scroll zoom -- can't use useState because it rerenders the map
  let stateJump = false;

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

  // ----------- map

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

  // Marker implementation if we want to use markers over clusters:

  // const markers = apiMarkerTest.map(point => {
  //     new mapboxgl.Marker()
  //         .setLngLat([parseFloat(point.longitude), parseFloat(point.latitude)])
  //         .addTo(map);
  // });

  map.on('load', function() {
    map.resize();
  });

  // brings us to user location
  // Add geolocate control to the map.
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  // simple navigation: +/-/rotate
  map.addControl(new mapboxgl.NavigationControl());

  // disable initial scrolling -- toggle it on and off with a button
  map.scrollZoom.disable();

  // --------- clusters

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

  // filter our clusters -- dummy filter in place
  const hydro = ['<', ['get', 'mag'], 2];
  const solar = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
  const wind = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
  const gas = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
  const oil = ['>=', ['get', 'mag'], 5];

  // our categories should be similar to this:

  // const hydro = ['==', ['get', 'fuel1'], 'Hydro'];
  // const solar = ['==', ['get', 'fuel1'], 'Solar'];
  // const wind = ['==', ['get', 'fuel1'], 'Wind'];
  // const gas = ['==', ['get', 'fuel1'], 'Gas'];
  // const oil = ['==', ['get', 'fuel1'], 'Oil'];
  // const others = ['any',
  //   ['==', ['get', 'fuel1'], 'Cogeneration'],
  //   ['==', ['get', 'fuel1'], 'Storage'],
  //   ['==', ['get', 'fuel1'], 'Other'],
  //   ['==', ['get', 'fuel1'], 'Wave and Tidel'],
  //   ['==', ['get', 'fuel1'], 'Petcoke'],
  //   ['==', ['get', 'fuel1'], '']
  // ];

  // colors to use for the categories
  const colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];
  // other possibles colors
  // const colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'];
  let hoveredStateId = null;

  let images = {
    popup: 'https://docs.mapbox.com/mapbox-gl-js/assets/popup.png',
    'popup-debug':
      'https://docs.mapbox.com/mapbox-gl-js/assets/popup_debug.png',
  };

  const usaBounds = [
    [-171.791110603, 18.91619],
    [-171.791110603, 71.3577635769],
    [-66.96466, 71.3577635769],
    [-66.96466, 18.91619],
  ];
  map.on('load', function() {
    // --- individual states
    // source for states
    map.addSource('states', {
      type: 'geojson',
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
    });

    // The feature-state dependent fill-opacity expression will render the hover effect
    // when a feature's hover state is set to true.
    map.addLayer({
      id: 'state-fills',
      type: 'fill',
      source: 'states',
      layout: {},
      paint: {
        'fill-color': 'rgb(217,169,210)',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.1,
          0,
        ],
      },
    });

    map.addLayer({
      id: 'state-borders',
      type: 'line',
      source: 'states',
      layout: {},
      paint: {
        'line-color': 'rgb(242,140,177)',
        'line-width': 2,
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.6,
          0,
        ],
      },
    });

    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    map.on('mousemove', 'state-fills', function(e) {
      if (stateJump) {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState(
              { source: 'states', id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: 'states', id: hoveredStateId },
            { hover: true }
          );
        }
      }
    });

    // When the mouse leaves the state-fill layer, remove the fill color from it
    map.on('mouseleave', 'state-fills', function() {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: 'states', id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = null;
    });

    map.on('click', 'state-fills', function(e) {
      let currentState = statesDB.filter(state => {
        return state.state === e.features[0].properties.STATE_NAME;
      });
      if (hoveredStateId && stateJump) {
        map.flyTo({
          center: [currentState[0].longitude, currentState[0].latitude],
          zoom: 7,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      }
    });

    // ------- incidents data visualization--------------

    // upload a custom marker image
    map.loadImage(
      // 'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
      //    "https://www.clipartmax.com/png/middle/302-3022804_swat-icon-swat-icon.png",
      myImg,
      function(error, image) {
        if (error) throw error;
        map.addImage('cat', image);
      }
    );

    // source in geojson format: list of all locations
    map.addSource('incidents', {
      type: 'geojson',
      // data: { features: geojson },
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      clusterProperties: {
        // keep separate counts for each magnitude category in a cluster
        hydro: ['+', ['case', hydro, 1, 0]],
        solar: ['+', ['case', solar, 1, 0]],
        wind: ['+', ['case', wind, 1, 0]],
        gas: ['+', ['case', gas, 1, 0]],
        oil: ['+', ['case', oil, 1, 0]],
      },
    }); // end of add Source

    // cluster layyer
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'incidents',
      // filter: ['has', 'point_count'],
      // new line for improved clusters
      filter: [
        'all',
        // can specify here a specific incident type
        ['==', ['get', 'cluster'], true],
      ],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        // 'circle-color': [
        //     'step',
        //     ['get', 'point_count'],
        //     '#51bbd6',
        //     100,
        //     '#f1f075',
        //     750,
        //     '#f28cb1'
        // ],
        'circle-color': 'rgba(0,0,0,.6)',
        // 'circle-stroke-color': '#8dd3c7',
        'circle-stroke-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          400,
          '#f28cb1',
        ],
        'circle-stroke-width': 5,
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 400, 40],
        // 'circle-radius': 15
      },
    }); // end of cluster layer

    // count display on the clusters
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'incidents',
      // filter: ['has', 'point_count'],
      filter: [
        'all',
        // can specify here a specific incident type
        ['==', ['get', 'cluster'], true],
      ],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 13,
      },
      // 'layout': {
      //     'text-field': ['number-format', ['get', 'point_count'], {}],
      //     'text-font': ['Montserrat Bold', 'Arial Unicode MS Bold'],
      //     'text-size': 13
      //   },
      paint: {
        'text-color': '#8dd3c7',
        // 'text-color': [
        //     'case',
        //     ['<', ['get', 'mag'], 3],
        //     'black',
        //     'white'
        //     ]
      },
    }); // end of cluster-count layer

    // single point outer layer?
    map.addLayer({
      id: 'unclestered-point-outer',
      type: 'circle',
      source: 'incidents',
      filter: [
        'all',
        // can specify here a specific incident type
        ['!=', ['get', 'cluster'], true],
      ],
      paint: {
        'circle-color': 'rgba(27,29,26, 0)',
        'circle-stroke-color': 'rgba(255,77,79, .1)',
        'circle-stroke-width': 3,
        'circle-radius': 23,
      },
    });

    // single point:
    map.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'incidents',
      filter: ['!', ['has', 'point_count']],
      // paint: {
      //     // 'circle-color': '#11b4da',
      //     // 'circle-radius': 4,
      //     // 'circle-stroke-width': 1,
      //     // 'circle-stroke-color': '#fff'
      //   'circle-radius': 5
      // }
      // 'filter': [
      //     'all',
      //     // can specify here a specific incident type
      //     ['!=', ['get', 'cluster'], true]
      //   ],
      //   'paint': {
      //   'circle-color': '#8dd3c7',
      //   'circle-radius': 5
      //   }
      layout: {
        visibility: 'visible',
        'icon-image': 'cat', // THIS SHOULD BE A MARKER
        'icon-size': 0.065, // ZOOMED FOR DEMO
        'icon-allow-overlap': true,
      },
      paint: {
        'icon-color': '#8dd3c7',
        'icon-halo-color': '#8dd3c7',
        'icon-halo-width': 2,
      },
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function(e) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      });
      const clusterId = features[0].properties.cluster_id;
      map
        .getSource('incidents')
        .getClusterExpansionZoom(clusterId, function(err, zoom) {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // pop up window for individual points
    map.on('click', 'unclustered-point', function(e) {
      const coordinates = e.features[0].geometry.coordinates.slice();
      // currently the popup is populated with with the dummy data properties
      // we can change those to urls and dates of incidents
      const mag = e.features[0].properties.mag;
      let tsunami;

      if (e.features[0].properties.tsunami === 1) {
        tsunami = 'yes';
      } else {
        tsunami = 'no';
      }

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML('magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami)
        .addTo(map);
    });

    map.on('mouseenter', 'clusters', function() {
      map.getCanvas().style.cursor = 'crosshair';
    });
    map.on('mouseleave', 'clusters', function() {
      map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'unclustered-point', function() {
      map.getCanvas().style.cursor = 'crosshair';
    });
    map.on('mouseleave', 'unclustered-point', function() {
      map.getCanvas().style.cursor = '';
    });
  }); // end of main map.on()

  return (
    <div className="buttons">
      <Button
        type="primary"
        className="appear"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          if (scrollEnabled) {
            map.scrollZoom.disable();
            scrollEnabled = false;
          } else {
            map.scrollZoom.enable();
            scrollEnabled = true;
          }
        }}
      >
        Scroll Zoom
      </Button>

      <Button
        type="primary"
        className="appear"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          top: '3%',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          map.flyTo({
            center: [currentState[0].longitude, currentState[0].latitude],
            zoom: 7,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }}
      >
        fly to state test
      </Button>

      <Button
        type="primary"
        className="appear"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          top: '6%',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          if (stateJump) {
            stateJump = false;
          } else {
            stateJump = true;
          }
        }}
      >
        State Jump
      </Button>

      <Button
        type="primary"
        className="appear"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          top: '9%',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          map.flyTo({
            center: [usZips[currentZip].longitude, usZips[currentZip].latitude],
            zoom: 12,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }}
      >
        Test Zip Code
      </Button>

      <Button
        type="primary"
        id="disappear"
        danger
        size="large"
        block
        style={{ zIndex: 10, position: 'absolute', bottom: '35%' }}
        onClick={() => {
          if (scrollEnabled) {
            map.scrollZoom.disable();
            scrollEnabled = false;
          } else {
            map.scrollZoom.enable();
            scrollEnabled = true;

            setTimeout(() => {
              document.getElementById('disappear').style.transition =
                'opacity 1s linear';
              document.getElementById('disappear').style.opacity = 0;
            }, 100);
            setTimeout(() => {
              document.getElementById('disappear').style.display = 'none';
            }, 1000);
            const hiddenButtons = document.getElementsByClassName('appear');
            for (let i = 0; i < hiddenButtons.length; i++) {
              setTimeout(() => {
                hiddenButtons[i].style.display = 'block';
              }, 900);
              setTimeout(() => {
                hiddenButtons[i].style.transition = 'opacity 1s linear';
                hiddenButtons[i].style.opacity = 1;
              }, 1200);
            }
          }
        }}
      >
        Start Using Map
      </Button>
    </div>
  );
};

export default Map;
