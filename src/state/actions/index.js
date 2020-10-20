// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.

// Declare action TYPES at the top of the file
import axios from 'axios';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const FETCH_INCIDENTS = 'FETCH_INCIDENTS';

export const updateFilters = filters => {
  return { type: UPDATE_FILTERS, payload: filters };
};

export const fetchIncidents = () => dispatch => {
  axios
    .get(`https://labs27-d-hrf-api.herokuapp.com/incidents/dummy`)
    .then(res => {
      dispatch({ type: FETCH_INCIDENTS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};
