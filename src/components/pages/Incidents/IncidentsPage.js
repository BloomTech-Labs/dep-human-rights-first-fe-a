import React, { useState} from 'react';

import IncidentCard from './IncidentCard';
import IncidentFilter from '../../common/IncidentFilter';
import Pagination from '../../common/Pagination';

import { usePaginatedQuery } from 'react-query';
import axios from 'axios';

const IncidentsPage = () => {

  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(24); // change to null to get back all data, 200 to test disabled next

  const incidents = usePaginatedQuery(
    ['incidents', { offset }],
    () => {
      return axios
        .get(`https://hrf-a-api.herokuapp.com/incidents/showallincidents`, {
          params: {
            limit: itemsPerPage,
            offset: offset,
          },
        })
        .then(res => {
          return res.data;
        });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const getNextPage = () => {
    setOffset(old => old + itemsPerPage);
    setPage(page + 1);
  };

  const getPreviousPage = () => {
    setOffset(old => old - itemsPerPage);
    setPage(page - 1);
  };


  return (
    <section className="uk-section uk-section-small">
      <div
        className="uk-container uk-container-expand"
      >
        <ul
          className="uk-grid-match uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l"
          data-uk-grid
        >
          {incidents.isLoading
            ? 'Loading...'
            : incidents.resolvedData.incidents.map(incident => {

                return (
                  <IncidentCard
                    key={incident.incident_id}
                    incident={incident}
                  />
                );


            })
          }
        </ul>
      </div>

      <section className="uk-section uk-section-small uk-tile-default uk-text-center">
        <div>
          <button 
            type="button"
            className="uk-button uk-button-primary uk-margin-right"
            onClick={getPreviousPage} disabled={offset === 0}>
            Prev
          </button>
          <span>
            Page {page} {incidents.isFetching ? '...' : ''}
          </span>
          <button
            onClick={getNextPage}
            disabled={incidents?.data?.incidents?.length < itemsPerPage}
            type="button"
            className="uk-button uk-button-primary uk-margin-left"
          >
            Next
          </button>
        </div>
      </section>
    </section>
  );
};
export default IncidentsPage;
