import React, { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import ageData from '../../data/wapo/byAge.json';
am4core.useTheme(am4themes_animated); 

function PieChart() {
  const chart = useRef(null);

  // gathers data into two-element sets
  const pieData = Object.entries(ageData); 
  // storage for chart data
  let returnData = [{
    category: "under 18", 
    number: 0
  },
  {
    category: "18-25", 
    number:0
  },
  {
    category: "25-35", 
    number: 0
  },
  {
    category: "35-45",
    number: 0
  },
  {
    category: "45-55", 
    number: 0
  }, 
  {
    category: "55-65", 
    number: 0
  }, 
  {
    category: "65 and over", 
    number: 0
  }]

  // This spaghetti is for cleaning the data before feeding it to the pie chart. 
  pieData.forEach(function(item) {
    if (item[0] < 18){
      returnData[0].number += item[1].length
    } else if (item[0] >= 18 && item[0] < 25){
      returnData[1].number += item[1].length
    } else if (item[0] >= 25 && item[0] < 35){
      returnData[2].number += item[1].length
    } else if (item[0] >= 35 && item[0] < 45){
      returnData[3].number += item[1].length
    } else if (item[0] >= 45 && item[0] < 55){
      returnData[4].number += item[1].length
    } else if (item[0] >= 55 && item[0] < 65){
      returnData[5].number += item[1].length
    } else if (item[0] >= 65){
      returnData[6].number += item[1].length
    }
  })
  useLayoutEffect(() => {
    //* Creates a new chart instance
    let pieChart = am4core.create('pieChart', am4charts.PieChart);
    pieChart.data = returnData;

    //* Creates chart title 
    let chartTitle = pieChart.titles.create(); 
    chartTitle.text = "Victims of Police Brutality by Age"; 
    chartTitle.fontSize = '1.6rem'; 
    chartTitle.fill = am4core.color('#215589')
    chartTitle.marginBottom = 30; 

    //* Adds a Series to the chart (a slice)
    let pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'number';
    pieSeries.dataFields.category = 'category';

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

  return <div id="pieChart" style={{ width: '100%', height: '500px' }}></div>;
}

export default PieChart;
