import React from 'react';
import { Link } from 'react-router-dom';

export default function IncidentFilter(props) {
  return (
    <div className="uk-grid-small uk-flex-middle" data-uk-grid>
      <div className="uk-width-expand">
        <div
          className="uk-grid-small uk-grid-divider uk-child-width-auto"
          data-uk-grid
        >
          <div>
            <ul className="uk-subnav uk-subnav-pill" data-uk-margin>
              <li className="uk-active" data-uk-filter-control>
                <Link to="#">All</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="uk-subnav uk-subnav-pill" data-uk-margin>
              <li data-uk-filter-control="[data-state='DC']">
                <Link to="#">DC</Link>
              </li>
              <li data-uk-filter-control="[data-state='MD']">
                <Link to="#">MD</Link>
              </li>
              <li data-uk-filter-control="[data-State='VA']">
                <Link to="#">VA</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="uk-subnav uk-subnav-pill" data-uk-margin>
              <li data-uk-filter-control="[data-size='small']">
                <Link to="#">Small</Link>
              </li>
              <li data-uk-filter-control="[data-size='medium']">
                <Link to="#">Medium</Link>
              </li>
              <li data-uk-filter-control="[data-size='large']">
                <Link to="#">Large</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="uk-width-auto uk-text-nowrap">
        <span className="uk-active" data-uk-filter-control="sort: data-name">
          <Link className="uk-icon-link" to="#" data-uk-icon="icon: arrow-down">
            up
          </Link>
        </span>
        <span data-uk-filter-control="sort: data-name; order: desc">
          <Link className="uk-icon-link" to="#" data-uk-icon="icon: arrow-up">
            down
          </Link>
        </span>
      </div>
    </div>
  );
}
