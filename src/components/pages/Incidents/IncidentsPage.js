import React, { useState, useEffect } from 'react';

import {usePaginatedQuery} from 'react-query';
import axios from 'axios';

import IncidentCard from '../../common/IncidentCard';
import Pagination from '../../common/Pagination';

// import { useIncidents } from '../../../hooks/useIncidentsPaginated';

const IncidentsPage = () => {
  // const incidents = useIncidents();

  const[page,setPage] =useState(1);
  const[offset,setOffset] =useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(200);  // change to null to get back all data

  
  const incidents = usePaginatedQuery(['incidents',{offset}],  () => {
       return axios
        .get(`https://hrf-a-api.herokuapp.com/incidents/showallincidents`,{
          params:{
            limit: itemsPerPage,
            offset: offset,
          }
        })
        .then(res => {
          console.log(res.data);
          return res.data;
        })
        .catch(err => {
          console.log(err.message);
        });
    },{
      refetchOnWindowFocus: false
    });

    
  
    const getNextPage = ()=> {
      setOffset(old => old+itemsPerPage);
      setPage(page + 1);
    };

    const getPreviousPage = () => {
      setOffset(old => old - itemsPerPage);
      setPage(page -1);
    };

    console.log(incidents?.data?.incidents?.length);

  // const [prevPage, setPrevPage] = useState();
  // const [nextPage, setNextPage] = useState();
  // const [maxPage, setMaxPage] = useState(
  //   Math.floor(incidents?.length / itemsPerPage)
  // );
  // const [currentPage, setCurrentPage] = useState();
  // const [pageContent, setPageContent] = useState();

  // testsing files

  return (
    <section className="uk-section uk-section-small">
      <div className="uk-container uk-container-expand">
        <ul
          className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m"
          data-uk-grid="masonry: true"
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
              })}
        </ul>
      </div>
      <button onClick={getPreviousPage} disabled={offset === 0}> Previous</button>
      <button onClick={getNextPage} disabled={incidents?.data?.incidents?.length < itemsPerPage}> Next</button>
      <span>Current page: {page} {incidents.isFetching ? '...' : ''}</span>
      {/* <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        setPage={setPage}
        maxPage={maxPage}
        currentPage={page}
      ></Pagination> */}
    </section>
  );
};
export default IncidentsPage;
