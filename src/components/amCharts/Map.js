import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_usaLow from '@amcharts/amcharts4-geodata/usaLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

function Map(props) {
  const chart = useRef(null);

  useLayoutEffect(() => {
    // Create map instance
    let chart = am4core.create('map', am4maps.MapChart);
    chart.maxZoomLevel = 64;

    // Set map definition
    chart.geodata = am4geodata_usaLow;

    // Set projection
    chart.projection = new am4maps.projections.AlbersUsa();

    // Add button
    var zoomOut = chart.tooltipContainer.createChild(am4core.ZoomOutButton);
    zoomOut.align = 'right';
    zoomOut.valign = 'top';
    zoomOut.margin(20, 20, 20, 20);
    zoomOut.events.on('hit', function() {
      if (currentSeries) {
        currentSeries.hide();
      }
      chart.goHome();
      zoomOut.hide();
      currentSeries = regionalSeries.US.series;
      currentSeries.show();
    });
    zoomOut.hide();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.calculateVisualCenter = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{name}';
    polygonTemplate.fill = chart.colors.getIndex(0);

    // Load data when map polygons are ready
    chart.events.on('ready', loadStores);

    // Loads store data
    function loadStores() {
      var loader = new am4core.DataSource();
      loader.url =
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/TargetStores.json';
      loader.events.on('parseended', function(ev) {
        setupStores(ev.target.data);
      });
      loader.load();
    }

    // Creates a series
    function createSeries(heatfield) {
      var series = chart.series.push(new am4maps.MapImageSeries());
      series.dataFields.value = heatfield;

      var template = series.mapImages.template;
      template.verticalCenter = 'middle';
      template.horizontalCenter = 'middle';
      template.propertyFields.latitude = 'lat';
      template.propertyFields.longitude = 'long';
      template.tooltipText = '{name}:\n[bold]{stores} stores[/]';

      var circle = template.createChild(am4core.Circle);
      circle.radius = 10;
      circle.fillOpacity = 0.7;
      circle.verticalCenter = 'middle';
      circle.horizontalCenter = 'middle';
      circle.nonScaling = true;

      var label = template.createChild(am4core.Label);
      label.text = '{stores}';
      label.fill = am4core.color('#fff');
      label.verticalCenter = 'middle';
      label.horizontalCenter = 'middle';
      label.nonScaling = true;

      var heat = series.heatRules.push({
        target: circle,
        property: 'radius',
        min: 10,
        max: 30,
      });

      // Set up drill-down
      series.mapImages.template.events.on('hit', function(ev) {
        // Determine what we've clicked on
        var data = ev.target.dataItem.dataContext;

        // No id? Individual store - nothing to drill down to further
        if (!data.target) {
          return;
        }

        // Create actual series if it hasn't been yet created
        if (!regionalSeries[data.target].series) {
          regionalSeries[data.target].series = createSeries('count');
          regionalSeries[data.target].series.data = data.markerData;
        }

        // Hide current series
        if (currentSeries) {
          currentSeries.hide();
        }

        // Control zoom
        if (data.type == 'state') {
          var statePolygon = polygonSeries.getPolygonById('US-' + data.state);
          chart.zoomToMapObject(statePolygon);
        } else if (data.type == 'city') {
          chart.zoomToGeoPoint(
            {
              latitude: data.lat,
              longitude: data.long,
            },
            64,
            true
          );
        }
        zoomOut.show();

        // Show new targert series
        currentSeries = regionalSeries[data.target].series;
        currentSeries.show();
      });

      return series;
    }

    var regionalSeries = {};
    var currentSeries;

    function setupStores(data) {
      // Init country-level series
      regionalSeries.US = {
        markerData: [],
        series: createSeries('stores'),
      };

      // Set current series
      currentSeries = regionalSeries.US.series;

      // Process data
      am4core.array.each(data.query_results, function(store) {
        // Get store data
        var store = {
          state: store.MAIL_ST_PROV_C,
          long: am4core.type.toNumber(store.LNGTD_I),
          lat: am4core.type.toNumber(store.LATTD_I),
          location: store.co_loc_n,
          city: store.mail_city_n,
          count: am4core.type.toNumber(store.count),
        };

        // Process state-level data
        if (regionalSeries[store.state] == undefined) {
          var statePolygon = polygonSeries.getPolygonById('US-' + store.state);
          if (statePolygon) {
            // Add state data
            regionalSeries[store.state] = {
              target: store.state,
              type: 'state',
              name: statePolygon.dataItem.dataContext.name,
              count: store.count,
              stores: 1,
              lat: statePolygon.visualLatitude,
              long: statePolygon.visualLongitude,
              state: store.state,
              markerData: [],
            };
            regionalSeries.US.markerData.push(regionalSeries[store.state]);
          } else {
            // State not found
            return;
          }
        } else {
          regionalSeries[store.state].stores++;
          regionalSeries[store.state].count += store.count;
        }

        // Process city-level data
        if (regionalSeries[store.city] == undefined) {
          regionalSeries[store.city] = {
            target: store.city,
            type: 'city',
            name: store.city,
            count: store.count,
            stores: 1,
            lat: store.lat,
            long: store.long,
            state: store.state,
            markerData: [],
          };
          regionalSeries[store.state].markerData.push(
            regionalSeries[store.city]
          );
        } else {
          regionalSeries[store.city].stores++;
          regionalSeries[store.city].count += store.count;
        }

        // Process individual store
        regionalSeries[store.city].markerData.push({
          name: store.location,
          count: store.count,
          stores: 1,
          lat: store.lat,
          long: store.long,
          state: store.state,
        });
      });

      regionalSeries.US.series.data = regionalSeries.US.markerData;
    }
  });

  return <div id="map" style={{ width: '100%', height: '700px' }}></div>;
}
export default Map;
