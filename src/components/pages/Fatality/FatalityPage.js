import React, {useState} from 'react';

import fatality from '../../../data/mpv/fatalityList.json';
import FatalityCard from './FatalityCard';

const FatalityPage = () => {

  const itemsPerPage = 24;
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(itemsPerPage);

  let victim_id = 0;
  const size = fatality.length;
  const maxPages = Math.ceil(size/itemsPerPage);

  // sets current data to render 
  let currentPage= fatality.slice(offset, limit);
  
  const getNextPage = () => {
    setOffset(old => old + itemsPerPage);
    setLimit(old => old + itemsPerPage);
    setPage(page + 1);
  };

  const getPreviousPage = () => {
    setOffset(old => old - itemsPerPage);
    setLimit(old => old - itemsPerPage);
    setPage(page - 1);
  };

  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <ul className="uk-grid-match uk-grid-small uk-child-width-1-2@m uk-child-width-1-3@l uk-child-width-1-4@xl" data-uk-grid>
          {currentPage.map(victim => {
            victim_id += 1;
            return <FatalityCard key={victim_id} victim={victim} />;
            })
          }
        </ul>
      </div>
      <section className="uk-section uk-section-small uk-tile-default uk-text-center">
        <div>
          <button 
            type="button"
            className="uk-button uk-button-secondary uk-margin-right"
            onClick={getPreviousPage} disabled={offset === 0}>
            Prev
          </button>
          <span>
            Page {page} of {maxPages}
          </span>
          <button
            onClick={getNextPage}
            disabled={page === maxPages}
            type="button"
            className="uk-button uk-button-secondary uk-margin-left"
          >
            Next
          </button>
        </div>
      </section>
      
    </section>
  );
};
export default FatalityPage;
