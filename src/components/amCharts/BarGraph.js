import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { useIncidents } from '../../hooks/useIncidents';

const dummyData = [
  {
    type: 'soft',
    local: 125,
    national: 500,
  },
  {
    type: 'hard',
    local: 114,
    national: 400,
  },
  {
    type: 'chemical',
    local: 165,
    national: 760,
  },
  {
    type: 'projectiles',
    local: 125,
    national: 500,
  },
  {
    type: 'other',
    local: 78,
    national: 320,
  },
  {
    type: 'presence',
    local: 105,
    national: 500,
  },
];

function BarGraph() {
  const incidents = useIncidents();
  const chart = useRef(null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const data = incidents.data;
    setGraphData(data);
  }, [incidents.isSuccess]);

  console.log(graphData);

  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);

    //* Creates chart instance
    let barGraph = am4core.create('barGraph', am4charts.XYChart);

    //* Adds chart data
    barGraph.data = dummyData;

    //* Creates the axes
    let typeAxis = barGraph.xAxes.push(new am4charts.CategoryAxis());
    typeAxis.title.text = 'Types of Force';
    typeAxis.dataFields.category = 'type';

    //* This is the first Y-axis to display national incidents
    let valueAxis1 = barGraph.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.title.text = 'National Incidents';

    //* This is the second Y-axis to display local incidents
    let valueAxis2 = barGraph.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = 'Local Incidents';
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;

    //* Creates Series for the Y-axis values
    let series1 = barGraph.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = 'national';
    series1.dataFields.categoryX = 'type';
    series1.yAxis = valueAxis1;
    series1.fill = barGraph.colors.getIndex(0);
    series1.strokeWidth = 0;
    series1.clustered = false;
    series1.columns.template.width = am4core.percent(40);

    let series2 = barGraph.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = 'local';
    series2.dataFields.categoryX = 'type';
    series2.yAxis = valueAxis1;
    series2.name = 'Locally Reported Incidents';
    series2.fill = barGraph.colors.getIndex(1).lighten(0.5);
    series2.strokeWidth = 0;
    series2.clustered = false;
    series2.toBack();

    //* Adds a cursor
    barGraph.cursor = new am4charts.XYCursor();

    //* Adds a legend
    barGraph.legend = new am4charts.Legend();
    barGraph.legend.position = 'top';

    //* Sets ref
    chart.current = barGraph;

    // //* Cleans up after unmount
    return () => {
      barGraph.dispose();
    };
  });

  return <div id="barGraph" style={{ width: '100%', height: '300px' }}></div>;
}

export default BarGraph;
