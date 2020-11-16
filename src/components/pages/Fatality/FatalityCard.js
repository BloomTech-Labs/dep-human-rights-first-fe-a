import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default function FatalityCard(props) {
  let victim = props.victim;
  let noData = '?';
  return (
    <li>
      <div className="uk-card uk-card-default uk-card-small uk-text-right">
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
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Age:</span>
              {victim.age ? victim.age : noData}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Gender:</span>
              {victim.gender ? victim.gender : noData}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Race: </span>
              {victim.race ? victim.race : noData}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Location:</span>
              {victim.city}, {victim.state}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Cause Of Death:</span>
              {victim.causeOfDeath ? victim.causeOfDeath : noData}
            </li>
            <br/>
            <hr />
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Criminal Charges:</span>
              {victim.criminalCharges ? victim.criminalCharges : noData}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">History of Mental Illness:</span>
              {victim.mentalIllness ? victim.mentalIllness : noData}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Alleged Weapons:</span>
              {victim.allegedWeapon ? victim.allegedWeapon : noData}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Alleged Threat Level:</span>
              {victim.allegedThreatLevel ? victim.allegedWeapon : noData}
            </li>
            <li className='uk-text-right'>
              <span className="uk-float-left uk-margin-small-right">Fleeing:</span>
              {victim.fleeing ? victim.fleeing : ' ?'}</li>
            <br/>
            <hr />
            <li>
              <span className="uk-float-left uk-margin-small-right">Body Camera:</span>
              {victim.bodyCamera ? victim.bodyCamera : noData}
            </li>
            <li>
              <span className="uk-float-left uk-margin-small-right">Off Duty:</span>
              {victim.offDuty ? victim.offDuty : noData}
            </li>
            <li className='uk-text-truncate'>
              <span className="uk-float-left uk-margin-small-right">Justified:</span>
              {victim.justified ? victim.justified : noData}
            </li>
            <li className='uk-text-truncate'>
              <span className="uk-float-left uk-margin-small-right">Agency Responsible:</span>
              {victim.agencyResponsibleForDeath ? victim.agencyResponsibleForDeath : noData}
            </li>
            <li className='uk-text-center uk-margin-top'>
              <button data-uk-toggle="target: .source_modal" type="button" className='uk-button uk-button-default uk-button-small'>
                {victim.document_url
                  ? 'Read'
                  : noData
                }
                
              </button>
              <div data-uk-modal className="source_modal">
                <div class="uk-modal-dialog uk-width-auto">
                  <iframe src={victim.document_url} className='uk-width-expand' style={{height: '90vh'}}></iframe>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
