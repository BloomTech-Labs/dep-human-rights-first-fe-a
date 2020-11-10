import React from 'react';
import { Link } from 'react-router-dom';

export default function Tables() {
  return (
    <div>
      <ul
        className="uk-child-width-expand"
        data-uk-tab="animation: uk-animation-fade; toggle: > *"
      >
        <li>
          <Link to="#">Item</Link>
        </li>
        <li>
          <Link to="#">Item</Link>
        </li>
        <li>
          <Link to="#">Item</Link>
        </li>
      </ul>
      <ul className="uk-switcher uk-margin">
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </li>
        <li>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </li>
        <li>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur, sed do eiusmod.
        </li>
      </ul>
    </div>
  );
}
