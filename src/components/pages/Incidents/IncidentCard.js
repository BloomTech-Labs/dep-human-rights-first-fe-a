import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default function IncidentCard(props) {
  let incident = props.incident;

  let stateAbbrList = {
    "Arizona": 'AZ',
    "Alabama": 'AL',
    "Alaska": 'AK',
    "Arkansas": 'AR',
    "California": 'CA',
    "Colorado": 'CO',
    "Connecticut": 'CT',
    "Delaware": 'DE',
    "Florida": 'FL',
    "Georgia": 'GA',
    "Hawaii": 'HI',
    "Idaho": 'ID',
    "Illinois": 'IL',
    "Indiana": 'IN',
    "Iowa": 'IA',
    "Kansas": 'KS',
    "Kentucky": 'KY',
    "Louisiana": 'LA',
    "Maine": 'ME',
    "Maryland": 'MD',
    "Massachusetts": 'MA',
    "Michigan": 'MI',
    "Minnesota": 'MN',
    "Mississippi": 'MS',
    "Missouri": 'MO',
    "Montana": 'MT',
    "Nebraska": 'NE',
    "Nevada": 'NV',
    "New Hampshire": 'NH',
    "New Jersey": 'NJ',
    "New Mexico": 'NM',
    "New York": 'NY',
    "North Carolina": 'NC',
    "North Dakota": 'ND',
    "Ohio": 'OH',
    "Oklahoma": 'OK',
    "Oregon": 'OR',
    "Pennsylvania": 'PA',
    "Rhode Island": 'RI',
    "South Carolina": 'SC',
    "South Dakota": 'SD',
    "Tennessee": 'TN',
    "Texas": 'TX',
    "Utah": 'UT',
    "Vermont": 'VT',
    "Virginia": 'VA',
    "Washington": 'WA',
    "West Virginia": 'WV',
    "Wisconsin": 'WI',
    "Wyoming": 'WY',
  };
  let city, state, stateAbbr;

  if (incident.city == 'DC') {
    city = 'Washington';
    state = 'District of Columbia';
    stateAbbr = 'DC';
  } else {
    city = incident.city;
    state = incident.state;
    stateAbbr = stateAbbrList[incident.state];
  }
  
  return (
    <li
      data-state={stateAbbr.toString()}
    >
      <div className="uk-card uk-card-default uk-card-small">
        <div className="uk-card-header uk-background-primary">
          <div className="uk-grid-small uk-flex-middle" data-uk-grid>
            <div className="uk-width-auto">
              <span className="uk-icon-button">{stateAbbr}</span>
            </div>
            <div className="uk-width-expand">
              <h5 className="uk-margin-remove-bottom">
                {city}, {state}
              </h5>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment dateTime={incident.date} format="dddd LL" />
              </p>
            </div>
          </div>
        </div>
        <div className="uk-card-body uk-margin-bottom" style={{height: '100px', minHeight:'100px', maxHeight:'100px',overflow:'scroll'}}>
          <h6>{incident.title}</h6>
          <p className="incident-description uk-text-small">{incident.desc}</p>
        </div>
        <div className="uk-card-footer uk-background-muted">
          <a href="#" className="uk-button uk-button-text">
            footer to be implemented
          </a>
        </div>
      </div>
    </li>
  );
}
