import React from 'react';

import Mapbox from '../../common/Mapbox';
import Charts from '../../common/Charts';

const VisualizationPage = () => {
  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-expand">
            <div className="uk-card uk-card-default uk-card-body uk-card-small">
              <Mapbox />
            </div>
            <div className="uk-card uk-card-default uk-card-body uk-card-small uk-margin-top">
              <Charts />
            </div>
          </div>
          <div className="uk-width-large@m uk-text-center">
            <div className="uk-card uk-card-default uk-card-body uk-card-small">
              table go here
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualizationPage;
