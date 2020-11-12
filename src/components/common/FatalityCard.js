import React from 'react';

export default function FatalityCard(props) {
  let victim = props.victim;
  return (
    <li>
      <div className="uk-card uk-card-default uk-card-small">
        <div className="uk-card-header uk-background-primary">
          <div className="uk-grid-small uk-flex-middle" data-uk-grid>
            <div className="uk-width-auto">
              <span className="uk-icon-button">tt</span>
            </div>
            <div className="uk-width-expand">
              <h5 className="uk-margin-remove-bottom">something</h5>
              <p className="uk-text-meta uk-margin-remove-top">
                <time dateTime="date">Date</time>
              </p>
            </div>
          </div>
        </div>
        <div className="uk-card-body">
          <h6>some title</h6>
          <p className="incident-description uk-text-small">text</p>
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
