import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';

const Graph = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const initialData = {
    labels: months,
    datasets: [
      {
        incidentId: 'all',
        label: 'All',
        data: [200, 190, 200, 180, 170, 190, 205, 190, 200, 160, 150, 180],
        borderColor: '#c0ba17',
        backgroundColor: 'rgba(0,0,0,0)',
      },
      {
        incidentId: 'energyDevices',
        label: 'Energy Devices',
        data: [100, 90, 100, 80, 70, 90, 50, 75, 60, 40, 30, 80],
        borderColor: '#6127cb',
        backgroundColor: 'rgba(0,0,0,0)',
      },
      {
        incidentId: 'softTechnique',
        label: 'Soft Technique',
        data: [4, 5, 6],
        borderColor: '#8b5c30',
        backgroundColor: 'rgba(0,0,0,0)',
      },
      {
        incidentId: 'hardTechnique',
        label: 'Hard Technique',
        data: [70, 60, 45, 60, 90, 75, 45, 90, 40, 20, 40, 60],
        borderColor: '#1f2739',
        backgroundColor: 'rgba(0,0,0,0)',
      },
      {
        incidentId: 'chemical',
        label: 'Chemical',
        data: [50, 90, 100, 55, 110, 130, 30, 25, 65, 35, 90, 140],
        borderColor: '#1707bd',
        backgroundColor: 'rgba(0,0,0,0)',
      },
      {
        incidentId: 'presence',
        label: 'Presence',
        data: [50, 60, 75, 100, 110, 150, 120, 90, 20, 40, 75, 110],
        borderColor: '#4cb59e',
        backgroundColor: 'rgba(0,0,0,0)',
      },
      {
        incidentId: 'other',
        label: 'Other',
        data: [50, 60, 45, 35, 55, 70, 65, 75, 60, 50, 90, 120],
        borderColor: '#9d13ae',
        backgroundColor: 'rgba(0,0,0,0)',
      },
    ],
  };

  const incidentTypes = useSelector(state => state.filters.incidents);

  const [data, setData] = useState(initialData);

  const options = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontSize: 16,
        padding: 32,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: false,
          beginAtZero: true,
          scaleLabel: {
            fontSize: 20,
            lineHeight: 2,
            display: true,
            labelString: '# of incidents',
          },
          ticks: {
            autoSkip: false,
          },
        },
      ],
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,
          scaleLabel: {
            fontSize: 20,
            lineHeight: 2,
            display: true,
            labelString: 'Timeline',
          },
          ticks: {
            autoSkip: false,
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        backgroundColor: '#191A1A',
        margin: '0 auto',
        maxWidth: '1550px',
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default Graph;
