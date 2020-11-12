import React from 'react';
import {fatality} from '../../../data/fatality';

const FatalityPage = () => {
  return (
    <div>
      {fatality.isLoading
        ? 'Loading...'
        : fatality.map(victim => {
          return (
            <div>test</div>
          );
        })
      }
    </div> 
  )
  
  
};
export default FatalityPage;
