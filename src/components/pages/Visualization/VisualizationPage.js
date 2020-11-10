import React from 'react';

import Charts from '../../common/Charts';
import Tables from '../../common/Tables';
import { useIncidents } from '../../../hooks/useIncidents';

const VisualizationPage = () => {
  const incidents = useIncidents();

  // all the incidents data from API
  console.log(incidents.data);

  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-expand">
            <div className="uk-card uk-card-default uk-card-body uk-card-small">
              map will go here
            </div>
            <div className="uk-card uk-card-default uk-card-body uk-card-small uk-margin-top">
              <Charts />
            </div>
          </div>
          <div className="uk-width-large@m uk-text-center">
            <div className="uk-card uk-card-default uk-card-body uk-card-small">
              <Tables />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualizationPage;
