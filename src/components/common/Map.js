import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as mapboxgl from 'mapbox-gl';
import statesDB from '../../database/states.json';
import { Button } from 'antd';
import usZips from 'us-zips';
import MapButtons from './MapButtons';
import incidentsDB from '../../database/data2.json';
import TwitterPopup from './TwitterPopup';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import myImg from '../../assets/police-badge.png';
import myImg2 from '../../assets/police-helmet.png';

const Map = () => {
  // using a NYC API to get dummy data for display on the map
  // this will be replaced with our project's backend once it's ready
  const [apiMarkerTest, setApiMarkerTest] = useState([]);
  let scrollEnabled = false; // toggles scroll zoom -- can't use useState because it rerenders the map
  let stateJump = false;
  const incidentType = useSelector(state => state.filters.incidents);

  console.log(incidentType);

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

  // brings us to user location
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

  // --------- converting json to geojson

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

  const typesString = incidentsDB.data.map((incident, index) => {
    const arr = incident['tags_str'].split(',');
    const yes = arr.map((item, index) => {
      return `type${index}:${item}`;
    });
    return yes;
  });

  // console.log(typesString)

  // const geojson2 = incidentsDB.data.map((incident, index) => ({
  //   geometry: {
  //     type: 'Point',
  //     coordinates: [
  //       parseFloat(incident.LONGITUDE),
  //       parseFloat(incident.LATITUDE),
  //     ],
  //   },
  //   type: 'Feature',
  //   properties: {
  //     date_text: incident['date_text'],
  //     title: incident.text,
  //     type: incident['tags_str'].split(','),
  //     // type: typesString[index],
  //     link1: incident.Link1,
  //     link2: incident.Link2,
  //   },
  // })
  // );

  const geojson2 = incidentsDB.data.map((incident, index) => {
    const arr = incident['tags_str'].split(',');
    const types = arr.map((item, i) => {
      // const obj = JSON.parse(`{"type${i}":"${item}"}`)
      // return `type${i}:${item}`
      return { [i]: item };
      // return obj
    });
    return {
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(incident.LONGITUDE),
          parseFloat(incident.LATITUDE),
        ],
      },
      type: 'Feature',
      properties: {
        date_text: incident['date_text'],
        title: incident.text,
        [types[0] ? 'type0' : null]: types[0] ? types[0][0] : null,
        [types[1] ? 'type1' : null]: types[1] ? types[1][1] : null,
        [types[2] ? 'type2' : null]: types[2] ? types[2][2] : null,
        [types[3] ? 'type3' : null]: types[3] ? types[3][3] : null,
        [types[4] ? 'type4' : null]: types[4] ? types[4][4] : null,
        [types[5] ? 'type5' : null]: types[5] ? types[5][5] : null,
        [types[6] ? 'type6' : null]: types[6] ? types[6][6] : null,
        link1: incident.Link1,
        link2: incident.Link2,
      },
    };
  });

  // console.log (geojson3)
  // console.log(geojson3[0].properties.type.join())

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
  // const colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'];

  let hoveredStateId = null;

  map.on('load', e => {
    // ---- individual states ----
    map.addSource('states', {
      type: 'geojson',
      data: 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson',
    });

    // opacity expression will render the hover effect when a feature's hover state is set to true.
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

    // When the user moves over the states, we will update them -- using state's id
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

    // ------- incidents data visualization (clusters)--------------

    // upload a custom icon image
    map.loadImage(
      // 'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png', // --> sample url
      myImg,
      function(error, image) {
        if (error) throw error;
        map.addImage('cat', image);
      }
    );

    map.loadImage(myImg2, function(error, image) {
      if (error) throw error;
      map.addImage('helmet', image);
    });

    // source in geojson format: list of all locations
    map.addSource('incidents', {
      type: 'geojson',
      // data: { features: geojson },
      // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson', // --> sample data
      data: { features: geojson2 },
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
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
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 400
        //   * Pink, 40px circles when point count is greater than or equal to 400
        'circle-color': 'rgba(0,0,0,.6)',
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
      paint: {
        'text-color': '#8dd3c7',
      },
    }); // end of cluster-count layer

    // single point outer layer
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
        'circle-stroke-color': 'rgba(27,29,26, .1)',
        'circle-stroke-width': 3,
        'circle-radius': 2,
      },
    });

    // single point:
    map.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'incidents',
      filter: ['!', ['has', 'point_count']],
      //  need below comments as  reference point for actual api

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
        'icon-size': 0.06, // ZOOMED FOR DEMO
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
    map.on('click', 'unclustered-point', e => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      // currently the popup is populated with with the dummy data properties

      const incident = e.features[0].properties;
      const date = incident['date_text'];
      const title = incident.title;
      // const type = incident.type
      const type = [
        incident.type0,
        incident.type1,
        incident.type2,
        incident.type3,
        incident.type4,
        incident.type5,
        incident.type6,
      ];
      const link = incident.link1;

      console.log(type);

      // if map zoomed out such that multiple copies of the feature are visible, popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const innerHtmlContent = `<div> <div style="display: flex; justify-content: space-between;"> <p>${date}</p>
         <p style="padding-right: 4%; opacity: .8">${type}</p></div>
          <h2>${title}</h2> <a target="_blank" href="${link}" id="link" style="font-size: 1rem; ">${link}</a>  
         <br>
         <br>
          </div>`;
      const divElement = document.createElement('div');
      divElement.setAttribute('id', 'hey');
      const assignBtn = document.createElement('div');
      assignBtn.setAttribute('id', 'assignBtn');
      if (incident.link1.toLowerCase().includes('twitter')) {
        assignBtn.innerHTML = `<button id="assign"> Learn More</button>`;
      }
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(assignBtn);

      assignBtn.addEventListener('click', e => {
        console.log(type);
        const element = <TwitterPopup id="twitterpop" incident={incident} />;
        ReactDOM.render(element, document.getElementById('hey'));
      });

      new mapboxgl.Popup({ className: 'apple-popup' })
        .setLngLat(coordinates)
        .setDOMContent(divElement)
        .setMaxWidth('none')
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

    // --------incident type filtering

    if (incidentType.softTechnique) {
      // map.setFilter('unclustered-point', ['==', ['get', 'type'], 'Projectiles'])
      // map.setFilter('unclustered-point', ['in', ['get', 'type0'], 'Soft'])
      // map.setFilter('clusters', ['in', ['get', 'type0'], 'Soft'])
      // map.setFilter('cluster-count', ['in', ['get', 'type0'], 'Soft'])
      // map.setFilter('unclestered-point-outer', ['==', ['get', 'type'], 'Projectiles'])
    }
  }); // end of main map.on()

  return (
    <div className="buttons">
      {/* this one button refuses to work when put into a different component */}
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
          if (stateJump) {
            stateJump = false;
          } else {
            stateJump = true;
          }
        }}
      >
        Fast Travel States
      </Button>

      <MapButtons scrollEnabled={scrollEnabled} map={map} usZips={usZips} />
    </div>
  );
};

export default Map;
