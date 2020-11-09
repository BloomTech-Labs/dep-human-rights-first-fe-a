import React from 'react';

import BarGraph from '../amCharts/BarGraph';
import HeatMapWithLegend from '../amCharts/HeatMapWithLegend';
import PieChart from '../amCharts/PieChart';
import RadarTimeline from '../amCharts/RadarTimeline';

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
      </ul>
    </div>
  );
}
