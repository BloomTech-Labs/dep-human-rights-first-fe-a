import React from 'react';

import FatalityCard from '../../common/FatalityCard';

import { fatality } from '../../../data/fatality';

const FatalityPage = () => {
  let victim_id = 0;
  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <ul
          className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m"
          data-uk-grid="masonry: true"
        >
          {fatality.isLoading
            ? 'Loading...'
            : fatality.map(victim => {
                victim_id += 1;
                return <FatalityCard key={victim_id} victim={victim} />;
              })}
        </ul>
      </div>
    </section>
  );
};
export default FatalityPage;
