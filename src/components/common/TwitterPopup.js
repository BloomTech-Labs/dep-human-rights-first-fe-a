import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Modal } from 'antd';
import ReactDOM from 'react-dom';

const TwitterPopup = ({ incident }) => {
  const hideModal = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('hey'));
  };

  // example: https://twitter.com/hungrybowtie/status/1277159562563317760 --> 1277159562563317760
  const getTweetId = url => {
    return url.split('/').pop();
  };

  const types = [
    incident.type0,
    incident.type1,
    incident.type2,
    incident.type3,
    incident.type4,
    incident.type5,
    incident.type6,
  ];

  return (
    <div>
      <Modal
        title={<h2>{incident.title}</h2>}
        destroyOnClose={true}
        closable={true}
        onCancel={hideModal}
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{incident['date_text']}</div>
            {/* <p>{types}</p> */}
            <p>{incident.type}</p>
          </div>
        }
        visible={true}
      >
        {incident ? (
          incident.link1.toLowerCase().includes('twitter') ? (
            <div>
              {/* <h2>{incident.title}</h2> */}
              <p>
                <a target="_blank" href={incident.link1}>
                  {incident.link1}{' '}
                </a>
              </p>
              <TwitterTweetEmbed tweetId={getTweetId(incident.link1)} />
            </div>
          ) : (
            <div>
              {/* <h2>{incident.title}</h2> */}
              <p>
                <a target="_blank" href={incident.link1}>
                  {incident.link1}{' '}
                </a>
              </p>
            </div>
          )
        ) : null}
      </Modal>
    </div>
  );
};

export default TwitterPopup;
