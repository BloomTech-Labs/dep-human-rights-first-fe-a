import React from 'react';

import MapTimeline from '../../amCharts/MapTimeline';

import { useIncidents } from '../../../hooks/useIncidents';

const VisualizationPage = () => {
  const incidents = useIncidents();

  // all the incidents data from API
  console.log(incidents.data);

  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid-small" data-uk-grid>
          <MapTimeline />
        </div>
      </div>
    </section>
  );
};

export default VisualizationPage;
