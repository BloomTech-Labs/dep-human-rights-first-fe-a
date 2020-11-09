import React from 'react';
import { useSelector } from 'react-redux';
import Mapbox from '../../common/Mapbox';

const VisualizationPage = () => {
  // incidents is an array of all incidents pulled in from state
  const incidents = useSelector(state => state.incidents.incidents);

  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid-small" data-uk-grid>
          <div className="uk-width-expand">
            <div className="uk-card uk-card-default uk-card-body uk-card-small">
              <Mapbox />
            </div>
            <div className="uk-card uk-card-default uk-card-body uk-card-small uk-margin-top">
              charts go here
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
