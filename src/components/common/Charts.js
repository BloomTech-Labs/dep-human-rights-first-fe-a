import React from 'react';
import { Link } from 'react-router-dom';

import RadarTimeline from '../amCharts/RadarTimeline';
import BarGraph from '../amCharts/BarGraph';
import PieChart from '../amCharts/PieChart';
import PopulationPyramid from '../amCharts/PopulationPyramid';


export default function Charts() {
  return (
    <div>
      <ul
        className="uk-child-width-expand"
        data-uk-tab="animation: uk-animation-fade; toggle: > *"
      >
        <li>
          <Link to="#">RadarTimeline</Link>
        </li>
        <li>
          <Link to="#">BarGraph</Link>
        </li>
        <li>
          <Link to="#">PieChart</Link>
        </li>
        <li>
          <Link to="#">PopulationPyramid</Link>
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
          <PopulationPyramid />
        </li>
      </ul>
    </div>
  );
}
