import React, { useState } from 'react';

import IncidentCard from '../../common/IncidentCard';
import IncidentFilter from '../../common/IncidentFilter';
import Pagination from '../../common/Pagination';

import { useIncidents } from '../../../hooks/useIncidents';

const IncidentsPage = () => {
  const getIncidents = useIncidents();
  const incidents = getIncidents.data;

  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [page, setPage] = useState('/incidents/?page=1');
  const [prevPage, setPrevPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [maxPage, setMaxPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageContent, setPageContent] = useState();

  let incidentsToRender;

  if (incidents) {
    incidentsToRender = incidents.map(incident => {
      return <IncidentCard key={incident.incident_id} incident={incident} />;
    });
  } else {
    incidentsToRender = 'Loading...';
  }

  return (
    <section className="uk-section uk-section-small">
      <div
        className="uk-container uk-container-expand"
        data-uk-filter="target: .js-filter"
      >
        <IncidentFilter />
        <ul
          className="js-filter uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m"
          data-uk-grid="masonry: true"
        >
          {incidentsToRender}
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
