import React from 'react';

import { TwitterShareButton } from 'react-share';

// built tweet https://publish.twitter.com/?buttonType=TweetButton&widget=Button

export default function TwitterShare() {
  return (
    <div>
      <TwitterShareButton
        url="http://google.com"
        children="Tweet"
        title="Human Rights Considered"
        hashtags={['tag1', 'tag2']}
        via="tono_mtzb"
      />
    </div>
  );
}
