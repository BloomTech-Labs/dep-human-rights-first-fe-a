import React, { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const dummyData = [
  {
    type: 'soft',
    number: 125,
  },
  {
    type: 'hard',
    number: 114,
  },
  {
    type: 'chemical',
    number: 165,
  },
  {
    type: 'projectiles',
    number: 125,
  },
  {
    type: 'other',
    number: 78,
  },
  {
    type: 'presence',
    number: 105,
  },
];

function PieChart() {
  const chart = useRef(null);

  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);

    //* Creates a new chart instance
    let pieChart = am4core.create('pieChart', am4charts.PieChart);

    pieChart.data = dummyData;

    //* Adds a Series to the chart (a slice)
    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'number';
    pieSeries.dataFields.category = 'type';

    //* Style and behavior rules for the chart series
    pieSeries.slices.template.stroke = am4core.color('#215589');
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    pieChart.legend = new am4charts.Legend();

    //* Sets ref to current chart
    chart.current = pieChart;

    //* Cleans up after unmount
    return () => {
      pieChart.dispose();
    };
  });

  return <div id="pieChart" style={{ width: '100%', height: '300px' }}></div>;
}

export default PieChart;
