import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import useDropDown from '../common/useDropDown';

const nationalData = [
  {
    month: 'January',
    incidents: 350,
    daily_average: 11.29,
  },
  {
    month: 'February',
    incidents: 567,
    daily_average: 20.25,
  },
  {
    month: 'March',
    incidents: 478,
    daily_average: 15.41,
  },
  {
    month: 'April',
    incidents: 705,
    daily_average: 23.5,
  },
  {
    month: 'May',
    incidents: 600,
    daily_average: 20,
  },
];

const michiganData = [
  {
    month: 'January',
    incidents: 24,
    daily_average: 0.77,
  },
  {
    month: 'February',
    incidents: 67,
    daily_average: 2.16,
  },
  {
    month: 'March',
    incidents: 47,
    daily_average: 1.5,
  },
  {
    month: 'April',
    incidents: 19,
    daily_average: 0.63,
  },
  {
    month: 'May',
    incidents: 34,
    daily_average: 1.09,
  },
];

const state_list = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
];

function BarGraph() {
  const chart = useRef(null);
  const [nationalValues, setNationalValues] = useState([]);
  const [stateValues, setStateValues] = useState([]);
  const [currentState, StatesDropDown] = useDropDown('States', '', state_list);

  useEffect(() => {
    setNationalValues(nationalData);
    //* to set state values I want the use to select a state, and if that name matches a state on the states array - set it to that object
    setStateValues(michiganData);
  });

  useLayoutEffect(() => {
    //* Creates chart instance
    let barGraph = am4core.create('barGraph', am4charts.XYChart);

    //* Adds chart data
    barGraph.data = nationalValues;

    //* Creates the axes
    let typeAxis = barGraph.xAxes.push(new am4charts.CategoryAxis());
    typeAxis.title.text = 'Month';
    typeAxis.dataFields.category = 'month';

    //* This is the first Y-axis to display national incidents
    let valueAxis1 = barGraph.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.title.text = 'Monthly Incidents';

    //* This is the second Y-axis to display local incidents
    let valueAxis2 = barGraph.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = '';
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;

    //* Creates Series for the Y-axis values
    let series1 = barGraph.series.push(new am4charts.ColumnSeries());
    series1.name = 'Nationwide Total Incidents';
    series1.dataFields.valueY = 'incidents';
    series1.dataFields.categoryX = 'month';
    series1.yAxis = valueAxis1;
    series1.fill = barGraph.colors.getIndex(0);
    series1.columns.template.width = am4core.percent(40);
    series1.strokeWidth = 0;
    series1.clustered = false;

    series1.tooltipText = '{name}:[bold font-size: 20]{valueY}[/]';

    let series2 = barGraph.series.push(new am4charts.ColumnSeries());
    series2.data = stateValues;
    series2.name = 'Statewide Total Incidents';
    series2.dataFields.valueY = 'incidents';
    series2.dataFields.categoryX = 'month';
    series2.yAxis = valueAxis1;
    series2.columns.template.width = am4core.percent(50);

    series2.tooltipText = '{name}:[bold font-size: 20]{valueY}[/]';

    //* Adds a cursor
    barGraph.cursor = new am4charts.XYCursor();
    barGraph.cursor.maxTooltipDistance = 20;

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

  return (
    <div>
      <StatesDropDown />
      <div id="barGraph" style={{ width: '100%', height: '300px' }}></div>
    </div>
  );
}

export default BarGraph;
