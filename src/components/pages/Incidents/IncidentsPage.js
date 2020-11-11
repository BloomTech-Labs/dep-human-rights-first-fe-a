import React, { useState } from 'react';

import IncidentCard from '../../common/IncidentCard';
import Pagination from '../../common/Pagination';

import { useIncidents } from '../../../hooks/useIncidentsPaginated';

const IncidentsPage = () => {
  const incidents = useIncidents();

  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [page, setPage] = useState('/incidents/?page=1');
  const [prevPage, setPrevPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [maxPage, setMaxPage] = useState(
    Math.floor(incidents?.length / itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState();
  const [pageContent, setPageContent] = useState();

  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <ul
          className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m"
          data-uk-grid="masonry: true"
        >
          {incidents.isLoading
            ? 'Loading...'
            : incidents.data.map(incident => {
                return (
                  <IncidentCard
                    key={incident.incident_id}
                    incident={incident}
                  />
                );
              })}
        </ul>
      </div>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        setPage={setPage}
        maxPage={maxPage}
        currentPage={currentPage}
      ></Pagination>
    </section>
  );
};
export default IncidentsPage;
