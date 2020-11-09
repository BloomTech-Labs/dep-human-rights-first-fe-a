import React from 'react';

import RadarTimeline from '../amCharts/RadarTimeline';
import BarGraph from '../amCharts/BarGraph';
import PieChart from '../amCharts/PieChart';
import HeatMapWithLegend from '../amCharts/HeatMapWithLegend';
import DirectedTree from '../amCharts/DirectedTree';
import PopulationPyramid from '../amCharts/PopulationPyramid';

export default function Charts() {
  return (
    <div>
      <ul
        className="uk-child-width-expand"
        data-uk-tab="animation: uk-animation-fade; toggle: > *"
      >
        <li>
          <a href="#">RadarTimeline</a>
        </li>
        <li>
          <a href="#">BarGraph</a>
        </li>
        <li>
          <a href="#">PieChart</a>
        </li>
        <li>
          <a href="#">HeatMapWithLegend</a>
        </li>
        <li>
          <a href="#">DirectedTree</a>
        </li>
        <li>
          <a href="#">PopulationPyramid</a>
        </li>
      </ul>
      <ul className="uk-switcher uk-margin">
        <li>
          <RadarTimeline />
        </li>
        <li>
          <BarGraph />
        </li>
        <li>
          <PieChart />
        </li>
        <li>
          <HeatMapWithLegend />
        </li>
        <li>
          <DirectedTree />
        </li>
        <li>
          <PopulationPyramid />
        </li>
      </ul>
    </div>
  );
}
