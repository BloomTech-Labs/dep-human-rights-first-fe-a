//* Reusable drop down menu - use as a hook in a component, supply the label, defaultState, and the list of options when called

import React, { useState } from 'react';

const useDropDown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);

  const DropDownMaker = () => (
    <label htmlFor={label} className="dropdown label">
      <select
        id={label}
        value={state}
        className="option-item select"
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
        disabled={!options.length}
      >
        <option className="option-item">Select a State</option>
        {options.map(item => (
          <option className="option-item" key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  return [state, DropDownMaker, setState];
};

export default useDropDown;
