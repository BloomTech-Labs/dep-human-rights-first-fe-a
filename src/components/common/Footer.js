import React from 'react';
import Logo from '../../assets/brand/hrf-footer-logo.png';

export default function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer>
      <div className="toggle-container">
        <button
          className="uk-button-toggle"
          type="button"
          data-uk-toggle="target: .uk-container"
        >
          <i className="fal fa-info-circle fa-lg"></i>
        </button>
      </div>
      <div className="uk-container uk-container-expand uk-text-center">
        Copyright © Human Rights First {year}
      </div>
      <div className="uk-container" hidden>
        <div className="uk-flex uk-flex-wrap uk-flex-wrap-around">
          <div className="uk-width-2-5@s uk-card uk-card-body uk-card-small">
            <img
              src={Logo}
              width="auto"
              height="40"
              alt="Human Rights First Logo"
            />
            <div>
              <a
                href="https://www.humanrightsfirst.org/asylum"
                className="uk-button uk-button-muted uk-text-bold uk-padding-small-horizontal"
              >
                Asylum
              </a>
              <a
                href="https://www.humanrightsfirst.org/donate"
                className="uk-button uk-button-secondary uk-text-bold"
              >
                Donate
              </a>
              <a
                href="https://www.humanrightsfirst.org/sign-up"
                className="uk-button uk-button-primary uk-text-bold"
              >
                Sign Up
              </a>
            </div>
          </div>
          <div className="uk-width-3-5@s uk-flex-first@s uk-card uk-card-body uk-card-small">
            <div>
              <a
                className="uk-button uk-button-text"
                href="https://www.humanrightsfirst.org/about"
              >
                About Us
              </a>
              <span>|</span>
              <a
                className="uk-button uk-button-text"
                href="https://www.humanrightsfirst.org/about/contact"
              >
                Contact
              </a>
              <span>|</span>
              <a
                className="uk-button uk-button-text"
                href="https://www.humanrightsfirst.org/press"
              >
                Press
              </a>
              <span>|</span>
              <a
                className="uk-button uk-button-text"
                href="https://www.humanrightsfirst.org/about/privacy-policy"
              >
                Terms & Privacy
              </a>
              <span>|</span>
              <a
                className="uk-button uk-button-text"
                href="https://www.humanrightsfirst.org/sign-up"
              >
                Sign Up
              </a>
              <span>|</span>
              <a
                className="uk-button uk-button-text"
                href="https://www.humanrightsfirst.org/careers"
              >
                Careers
              </a>
            </div>
            <div className="uk-padding-small">
              <div>
                <h6 className="uk-text-primary">
                  New York · Washington · Houston · Los Angeles
                </h6>
                <p>
                  Human Rights First, 75 Broad St, 31st Floor, New York, NY
                  10004
                </p>
              </div>
              <p>For Media Inquiries call 202-370-3323</p>
              <p>
                Human Rights First is a nonpartisan, 501(c)(3), international
                human rights organization based in New York and Washington, DC.
                We do not favor or oppose any candidate for public office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
