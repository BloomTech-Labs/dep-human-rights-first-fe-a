import React from 'react';
import Logo from '../../assets/brand/hrf-logo.svg';

export default function Header() {
  return (
    <header>
      <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
        <nav className="uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <a className="uk-navbar-item uk-logo uk-text-primary" href="/">
              <img
                src={Logo}
                width="40"
                height="40"
                alt="Human Rights First Logo"
                className="uk-margin-small-right"
              />
              human rights <span className="uk-text-italic">&nbsp; first</span>
            </a>
          </div>
          <div className="uk-navbar-center">
            <ul className="uk-navbar-nav">
              <li>
                <a href="#">Link</a>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <a href="#">Link</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
