import React, { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated); 

function RadarTimeline() {
  const timelineChart = useRef(null);

  var states = {
    California: [
      ['San Franciso', 1, 2, 3, 4, 5],
      ['San Diego', 1, 0, 1, 3, 0],
    ],
    Illinois: [
      ['Chicago', 1, 0, 11, 3, 4],
      ['Belleville', 1, 0, 0, 0, 0],
    ],
    Maine: [
      ['Portland', 2, 0, 1, 5, 2],
      ['Lewiston', 3, 0, 5, 1, 1],
    ],
    Maryland: [
      ['Baltimor', 2, 7, 1, 3, 1],
      ['Annapolis', 1, 1, 1, 3, 0],
    ],
    Massachusetts: [
      ['Boston', 1, 0, 1, 3, 0],
      ['Plymouth', 1, 0, 1, 1, 0],
    ],
    Texas: [
      ['Houston', 1, 0, 1, 3, 0],
      ['Austin', 1, 4, 1, 3, 0],
      ['Dallas', 1, 1, 1, 3, 1],
    ],
  };

  var startYear = 2015;
  var endYear = 2020;
  var currentYear = 2020;

  useLayoutEffect(() => {
    var colorSet = new am4core.ColorSet();

    var chart = am4core.create('radarTimeline', am4charts.RadarChart);
    // chart.numberFormatter.numberFormat = '+#.0°C|#.0°C|0.0°C';
    chart.hiddenState.properties.opacity = 0;

    chart.startAngle = 270 - 180;
    chart.endAngle = 270 + 180;

    chart.padding(5, 15, 5, 10);
    chart.radius = am4core.percent(65);
    chart.innerRadius = am4core.percent(40);

    // year label goes in the middle
    var yearLabel = chart.radarContainer.createChild(am4core.Label);
    yearLabel.horizontalCenter = 'middle';
    yearLabel.verticalCenter = 'middle';
    yearLabel.fill = am4core.color('#673AB7');
    yearLabel.fontSize = 30;
    yearLabel.text = String(currentYear);

    // zoomout button
    var zoomOutButton = chart.zoomOutButton;
    zoomOutButton.dx = 0;
    zoomOutButton.dy = 0;
    zoomOutButton.marginBottom = 15;
    zoomOutButton.parent = chart.rightAxesContainer;

    // scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.rightAxesContainer;
    chart.scrollbarX.orientation = 'vertical';
    chart.scrollbarX.align = 'center';
    chart.scrollbarX.exportable = false;

    // vertical orientation for zoom out button and scrollbar to be positioned properly
    chart.rightAxesContainer.layout = 'vertical';
    chart.rightAxesContainer.padding(120, 20, 120, 20);

    // category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = 'country';

    var categoryAxisRenderer = categoryAxis.renderer;
    var categoryAxisLabel = categoryAxisRenderer.labels.template;
    categoryAxisLabel.location = 0.5;
    categoryAxisLabel.radius = 28;
    categoryAxisLabel.relativeRotation = 90;

    categoryAxisRenderer.fontSize = 11;
    categoryAxisRenderer.minGridDistance = 10;
    categoryAxisRenderer.grid.template.radius = -25;
    categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
    categoryAxisRenderer.grid.template.interactionsEnabled = false;

    categoryAxisRenderer.ticks.template.disabled = true;
    categoryAxisRenderer.axisFills.template.disabled = true;
    categoryAxisRenderer.line.disabled = true;

    categoryAxisRenderer.tooltipLocation = 0.5;
    categoryAxis.tooltip.defaultState.properties.opacity = 0;

    // value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 6;
    valueAxis.strictMinMax = true;
    valueAxis.tooltip.defaultState.properties.opacity = 0;
    valueAxis.tooltip.animationDuration = 0;
    valueAxis.cursorTooltipEnabled = true;
    valueAxis.zIndex = 10;

    var valueAxisRenderer = valueAxis.renderer;
    valueAxisRenderer.axisFills.template.disabled = true;
    valueAxisRenderer.ticks.template.disabled = true;
    valueAxisRenderer.minGridDistance = 20;
    valueAxisRenderer.grid.template.strokeOpacity = 0.05;

    // series
    var series = chart.series.push(new am4charts.RadarColumnSeries());
    series.columns.template.width = am4core.percent(90);
    series.columns.template.strokeOpacity = 0;
    series.dataFields.valueY = 'value' + currentYear;
    series.dataFields.categoryX = 'country';
    series.tooltipText = '{categoryX}:{valueY.value}';

    // this makes columns to be of a different color, depending on value
    series.heatRules.push({
      target: series.columns.template,
      property: 'fill',
      minValue: 0,
      maxValue: 6,
      min: am4core.color('#673AB7'),
      max: am4core.color('#F44336'),
      dataField: 'valueY',
    });

    // cursor
    var cursor = new am4charts.RadarCursor();
    chart.cursor = cursor;
    cursor.behavior = 'zoomX';

    cursor.xAxis = categoryAxis;
    cursor.innerRadius = am4core.percent(40);
    cursor.lineY.disabled = true;

    cursor.lineX.fillOpacity = 0.2;
    cursor.lineX.fill = am4core.color('#000000');
    cursor.lineX.strokeOpacity = 0;
    cursor.fullWidthLineX = true;

    // year slider
    var yearSliderContainer = chart.createChild(am4core.Container);
    yearSliderContainer.layout = 'vertical';
    yearSliderContainer.padding(0, 38, 0, 38);
    yearSliderContainer.width = am4core.percent(100);

    var yearSlider = yearSliderContainer.createChild(am4core.Slider);
    yearSlider.events.on('rangechanged', function() {
      updateRadarData(
        startYear + Math.round(yearSlider.start * (endYear - startYear))
      );
    });
    yearSlider.orientation = 'horizontal';
    yearSlider.start = 0.5;
    yearSlider.exportable = false;

    chart.data = generateRadarData();

    function generateRadarData() {
      var data = [];
      var i = 0;
      for (var cities in states) {
        var citiesData = states[cities];

        citiesData.forEach(function(country) {
          var rawDataItem = { country: country[0] };

          for (var y = 2; y < country.length; y++) {
            rawDataItem['value' + (startYear + y - 2)] = country[y];
          }

          data.push(rawDataItem);
        });

        createRange(cities, citiesData, i);
        i++;
      }
      return data;
    }

    function updateRadarData(year) {
      if (currentYear !== year) {
        currentYear = year;
        yearLabel.text = String(currentYear);
        series.dataFields.valueY = 'value' + currentYear;
        chart.invalidateRawData();
      }
    }

    function createRange(name, citiesData, index) {
      var axisRange = categoryAxis.axisRanges.create();
      axisRange.axisFill.interactionsEnabled = true;
      axisRange.text = name;
      // first country
      axisRange.category = citiesData[0][0];
      // last country
      axisRange.endCategory = citiesData[citiesData.length - 1][0];

      // every 3rd color for a bigger contrast
      axisRange.axisFill.fill = colorSet.getIndex(index * 3);
      axisRange.grid.disabled = true;
      axisRange.label.interactionsEnabled = false;
      axisRange.label.bent = true;

      var axisFill = axisRange.axisFill;
      axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
      axisFill.radius = -20; // negative radius means it is calculated from max radius
      axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
      axisFill.fillOpacity = 1;
      axisFill.togglable = true;

      axisFill.showSystemTooltip = true;
      axisFill.readerTitle = 'click to zoom';
      axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      axisFill.events.on('hit', function(event) {
        var dataItem = event.target.dataItem;
        if (!event.target.isActive) {
          categoryAxis.zoom({ start: 0, end: 1 });
        } else {
          categoryAxis.zoomToCategories(
            dataItem.category,
            dataItem.endCategory
          );
        }
      });

      // hover state
      var hoverState = axisFill.states.create('hover');
      hoverState.properties.innerRadius = -10;
      hoverState.properties.radius = -25;

      var axisLabel = axisRange.label;
      axisLabel.location = 0.5;
      axisLabel.fill = am4core.color('#ffffff');
      axisLabel.radius = 3;
      axisLabel.relativeRotation = 0;
    }

    var slider = yearSliderContainer.createChild(am4core.Slider);
    slider.start = 1;
    slider.exportable = false;
    slider.events.on('rangechanged', function() {
      var start = slider.start;

      chart.startAngle = 270 - start * 179 - 1;
      chart.endAngle = 270 + start * 179 + 1;

      valueAxis.renderer.axisAngle = chart.startAngle;
    });
    //* sets ref
    timelineChart.current = chart;

    return () => {
      chart.dispose();
    };
  });

  return (
    <div id="radarTimeline" style={{ width: '100%', height: '700px' }}></div>
  );
}

export default RadarTimeline;
