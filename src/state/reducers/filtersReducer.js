import { UPDATE_FILTERS } from '../actions/';

const initialIncidents = {
  energyDevices: true,
  softTechnique: true,
  hardTechnique: true,
  projectiles: true,
  chemical: true,
  presence: true,
  other: true,
};

const initialState = {
  stateName: '',
  zipCode: '',
  incidents: initialIncidents,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
