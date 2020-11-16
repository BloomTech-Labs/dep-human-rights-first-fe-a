import React, {useState} from 'react';

import FatalityCard from './FatalityCard';

import fatality from '../../../data/mpv/fatalityList.json'


const FatalityPage = () => {
  let victim_id = 0;
  let currentPage = fatality.slice(500, 512)
  console.log(currentPage)
  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <ul
          className="uk-grid-small uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-4@xl"
          data-uk-grid="masonry: true"
        >
          {currentPage.map(victim => {
                victim_id += 1;
                return <FatalityCard key={victim_id} victim={victim} />;
            })
          }
        </ul>
      </div>
    </section>
  );
};
export default FatalityPage;
