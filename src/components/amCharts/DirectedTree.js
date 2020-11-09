//* Note: A Force Directed Tree is a special kind of chart used to display of multi-item data related in hierarchical, linear or mixed way, as a series of linked bubbles. *//
import React, { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

function DirectedTree() {
  const chart = useRef(null);

  useLayoutEffect(() => {
    //* Creates a chart instance
    let directedTree = am4core.create(
      'directedTree',
      am4plugins_forceDirected.ForceDirectedTree
    );

    //* Sets up Series
    //* note: per amCharts docs: "The data in Force Directed Tree is always set to the series"
    let series = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedTreeSeries()
    );

    //* Sets Ref
    chart.current = directedTree;
    return () => {
      directedTree.dispose();
    };
  });

  return <div id="directedTree"></div>;
}

export default DirectedTree;
