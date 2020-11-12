import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/brand/hrf-logo.svg';

export default function Header() {
  return (
    <header>
      <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
        <nav className="uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <Link className="uk-navbar-item uk-logo uk-text-primary" to="/">
              <img
                src={Logo}
                width="40"
                height="40"
                alt="Human Rights First Logo"
                className="uk-margin-small-right"
              />
              human rights <span className="uk-text-italic">&nbsp; first</span>
            </Link>
          </div>
          <div className="uk-navbar-center">
            <ul className="uk-navbar-nav">
              <li>
                <Link to="/map">Map</Link>
              </li>
              <li>
                <Link to="/incidents">Incidents</Link>
              </li>
              <li>
                <Link to="/fatality">Fatality</Link>
              </li>
              <li>
                <Link to="/stats">Stats</Link>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <Link to="#">Link</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
