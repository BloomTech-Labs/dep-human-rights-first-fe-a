import React from 'react';
import Map from '../../amCharts/Map';

const MapPage = () => {
  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid-small uk-child-width-1-1" data-uk-grid>
          <div>
            <div className="uk-card uk-card-default uk-card-body uk-card-small">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MapPage;
