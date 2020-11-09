import { FETCH_INCIDENTS } from '../actions';

// const initialState = {
//   incidents: [],
// };

const initialState = {
  incidents: [
    {
      incident_id: 1,
      state: 'Washington',
      city: 'Olympia',
      desc:
        'Footage shows a few individuals break off from a protest to smash City Hall windows. Protesters shout at vandals to stop.\n\nPolice then arrive. They arrest multiple individuals near the City Hall windows, including one individual who appeared to approach the vandals in an effort to defuse the situation.\n\nPolice fire tear gas and riot rounds at protesters during the arrests. Protesters become agitated.\n\nAfter police walk arrestee away, protesters continue to shout at police. Police respond with a second bout of tear gas and riot rounds.\n\nA racial slur can be heard shouted, although it is unsure who is shouting.',
      title: 'Police respond to broken windows with excessive force',
      date: '2020-05-31T04:00:00.000Z',
      id: 'wa-olympia-1',
      lat: 47.0417,
      long: -122.8959,
      src: [
        { src_id: 1, incident_id: 1, src_url: 'url1', src_type: 'post' },
        { src_id: 2, incident_id: 1, src_url: 'url2', src_type: 'video' },
      ],
      categories: ['projectiles', 'presence', 'chemical'],
    },
    {
      incident_id: 2,
      state: 'Washington',
      city: 'Seattle',
      desc:
        'Officer pins protester with his knee on his neck. His partner intervenes and moves his knee onto the individual\'s back.\n\nPossibly related to OPD Case 2020OPA-0324 - "Placing the knee on the neck area of two people who had been arrested"',
      title: 'Officer pins protester by pushing his knee into his neck',
      date: '2020-05-30T04:00:00.000Z',
      id: 'wa-seattle-1',
      lat: 47.6211,
      long: -122.3244,
      src: [
        {
          src_id: 3,
          incident_id: 2,
          src_url: 'url3',
          src_type: 'article',
        },
      ],
      categories: ['presence'],
    },
  ],
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
