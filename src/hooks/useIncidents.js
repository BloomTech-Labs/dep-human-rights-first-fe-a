// react query hook can be called anywhere in the app to get data from backend without needing redux and context API
// To call:   const queryInfo = useIncidents()
//  queryInfo.data has all the incident data, refer to react-query docs on further use https://react-query.tanstack.com/docs/overview

import axios from 'axios';
import { useQuery } from 'react-query';

export const useIncidents = () => {
  return useQuery(
    'incidents',
    () => {
      return axios
        .get(`https://hrf-a-api.herokuapp.com/incidents/showallincidents`)
        .then(res => res.data)
        .catch(err => {
          console.log(err);
        });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
