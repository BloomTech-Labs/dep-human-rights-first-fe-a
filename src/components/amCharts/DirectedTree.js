//* Note: A Force Directed Tree is a special kind of chart used to display of multi-item data related in hierarchical, linear or mixed way, as a series of linked bubbles. *//
import React, { useLayoutEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

const dummyData = [
  {
    name: 'Core',
    children: [
      {
        name: 'First',
        children: [
          { name: 'A1', value: 100 },
          { name: 'A2', value: 60 },
        ],
      },
      {
        name: 'Second',
        children: [
          { name: 'B1', value: 135 },
          { name: 'B2', value: 98 },
        ],
      },
      {
        name: 'Third',
        children: [
          {
            name: 'C1',
            children: [
              { name: 'EE1', value: 130 },
              { name: 'EE2', value: 87 },
              { name: 'EE3', value: 55 },
            ],
          },
          { name: 'C2', value: 148 },
          {
            name: 'C3',
            children: [
              { name: 'CC1', value: 53 },
              { name: 'CC2', value: 30 },
            ],
          },
          { name: 'C4', value: 26 },
        ],
      },
      {
        name: 'Fourth',
        children: [
          { name: 'D1', value: 415 },
          { name: 'D2', value: 148 },
          { name: 'D3', value: 89 },
        ],
      },
      {
        name: 'Fifth',
        children: [
          {
            name: 'E1',
            children: [
              { name: 'EE1', value: 33 },
              { name: 'EE2', value: 40 },
              { name: 'EE3', value: 89 },
            ],
          },
          {
            name: 'E2',
            value: 148,
          },
        ],
      },
    ],
  },
];

function DirectedTree() {
  const chart = useRef(null);

  useLayoutEffect(() => {
    //* Creates a chart instance
    let directedTree = am4core.create(
      'directedTree',
      am4plugins_forceDirected.ForceDirectedTree
    );
    directedTree.data = dummyData;

    //* Sets up Series
    //* note: per amCharts docs: "The data in Force Directed Tree is always set to the series"
    let networkSeries = directedTree.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    );
    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.children = 'children';
    networkSeries.nodes.template.tooltipText = '{name}:{value}';
    networkSeries.nodes.template.fillOpacity = 1;

    networkSeries.nodes.template.label.text = '{name}';
    networkSeries.fontSize = 10;
    networkSeries.links.template.strokeWidth = 1;

    //* Sets Ref
    chart.current = directedTree;
    return () => {
      directedTree.dispose();
    };
  });

  return (
    <div id="directedTree" style={{ width: '100%', height: '500px' }}></div>
  );
}

export default DirectedTree;
