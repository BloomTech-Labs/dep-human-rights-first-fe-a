import React, { useState } from 'react';
import IncidentCard from '../../common/IncidentCard';

import { useIncidents } from '../../../hooks/useIncidents';

const IncidentsPage = () => {
  const getIncidents = useIncidents();
  const incidents = getIncidents.data;
  console.log(incidents);

  let incidentsToRender;

  if (incidents) {
    incidentsToRender = incidents.map(incident => {
      return <IncidentCard key={incident.incident_id} incident={incident} />;
    });
  }
  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <ul
          className="uk-grid-small uk-child-width-1-4@m"
          data-uk-grid="masonry: true"
        >
          {incidentsToRender}
        </ul>
      </div>
    </section>
  );
};
export default IncidentsPage;
