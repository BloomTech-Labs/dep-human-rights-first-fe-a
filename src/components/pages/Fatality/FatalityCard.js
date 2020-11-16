import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default function FatalityCard(props) {
  let victim = props.victim;
  return (
    <li>
      <div className="uk-card uk-card-default uk-card-small">
        <div className="uk-card-header uk-background-secondary uk-light">
          <div className="uk-grid-small uk-flex-middle" data-uk-grid>
            <div className="uk-width-auto">
              {victim.image_url ? (
                <img
                  className="uk-border-circle"
                  width="40"
                  height="40"
                  src={victim.image_url}
                  alt={victim.name}
                />
              ) : (
                <span className="uk-icon-button">
                  <i className="fal fa-user"></i>
                </span>
              )}
            </div>
            <div className="uk-width-expand">
              <h5 className="uk-margin-remove-bottom">{victim.name}</h5>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment dateTime={victim.date} format="dddd LL" />
              </p>
            </div>
          </div>
        </div>
        <div className="uk-card-body">
          <ul className="uk-list uk-list-collapse uk-text-small uk-text-right">
            <li><span className="uk-float-left">Age:</span>{victim.age}</li>
            <li><span className="uk-float-left">Gender:</span>{victim.gender} </li>
            <li><span className="uk-float-left">Race: </span>{victim.race}</li>
            <li><span className="uk-float-left">Location:</span>{victim.city}, {victim.state}</li>
            <li><span className="uk-float-left">Cause Of Death:</span>{victim.causeOfDeath}</li>
            <li><span className="uk-float-left">Criminal Charges:</span>{victim.criminalCharges}</li>
            <li><span className="uk-float-left">Mental Illness:</span>{victim.mentalIllness}</li>
            <li><span className="uk-float-left">Justified:</span>{victim.justified}</li>
            <li><span className="uk-float-left">Agency Responsible:</span>{victim.agencyResponsibleForDeath}</li>
          </ul>
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
