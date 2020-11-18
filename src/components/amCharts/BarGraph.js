import React, { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import importData from '../../data/wapo/byState.json';

am4core.useTheme(am4themes_animated); 

function BarGraph() {
  // the ref is set for proper disposal of a chart after the component unmounts 
  const chart = useRef(null);
  const barData = Object.entries(importData); 

  const preparedData = []; 

  //* Note: This data was created by a group member using python. I have pulled it in and filtered it here to organize the data 
  barData.forEach(function(item){
    preparedData.push({ state: item[0], number: item[1].length })
  })

  //* Note: The amCharts docs don't contain much information on amCharts in React, I first tried to get these charts to work in a useEffect, but wasn't able to
  // useLayoutEffect runs synchronously, after DOM manipulations (allowing the library to perform DOM measurements for the charts)
  useLayoutEffect(() => {
    //* Creates chart instance
    let barGraph = am4core.create('barGraph', am4charts.XYChart);

    //* Creates chart title
    let chartTitle = barGraph.titles.create(); 
    chartTitle.text = "Reports of Police Involvement Resulting in Death"; 
    chartTitle.fontSize = '1.6rem'; 
    chartTitle.fill = am4core.color('#215589')
    chartTitle.marginBottom = 30; 

    //* Adds chart data
    barGraph.data = preparedData;

    //* Creates the axes
    let typeAxis = barGraph.xAxes.push(new am4charts.CategoryAxis());
    typeAxis.title.text = 'US States';
    typeAxis.dataFields.category = 'state';

    //* This is the first Y-axis 
    let valueAxis1 = barGraph.yAxes.push(new am4charts.ValueAxis());

    //* This is a secondary axis, the goal was to use this goal to comparatively view data (two colums series over one another). I didn't get there, but if a certain future dev came along...
    let valueAxis2 = barGraph.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;

    //* Creates Series for the Y-axis values (incidents reported by state)
    let series1 = barGraph.series.push(new am4charts.ColumnSeries());
    series1.name = "Fatal Incident Reports"
    series1.dataFields.valueY = 'number';
    series1.dataFields.categoryX = 'state';
    series1.yAxis = valueAxis1;
    series1.fill = barGraph.colors.getIndex(0);
    series1.strokeWidth = 0;
    series1.clustered = false;
    series1.columns.template.width = am4core.percent(75);

    //* Adds a cursor
    // the cursor can be set to hidden - but you should keep it for zoom capabilities
    barGraph.cursor = new am4charts.XYCursor();

    //* Adds a scrollbar - that box below the graph that you can drag to view a subset of the graph
    barGraph.scrollbarX = new am4charts.XYChartScrollbar();  
    barGraph.scrollbarX.series.push(series1);  
    barGraph.scrollbarX.parent = barGraph.bottomAxesContainer; 

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

  return <div id="barGraph" style={{ width: '100%', height: '500px' }}></div>;
}

export default BarGraph;
