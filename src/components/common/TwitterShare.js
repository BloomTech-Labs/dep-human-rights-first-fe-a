import React from 'react';
import { TwitterShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function TwitterShare() {
  return (
    <div className="uk-button twitter-btn">
      <FontAwesomeIcon icon={faTwitter} />
      <TwitterShareButton
        className="share-btn"
        url="http://google.com"
        children="Tweet"
        title="Human Rights Considered"
        hashtags={['human-rights-first']}
        // via="username"
      />
    </div>
  );
}
