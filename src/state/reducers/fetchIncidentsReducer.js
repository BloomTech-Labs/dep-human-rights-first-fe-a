import { FETCH_INCIDENTS } from '../actions';

const initialState = {
  incidents: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INCIDENTS:
      return {
        ...state,
        incidents: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
