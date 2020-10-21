import React from 'react';
import { Button, Result } from 'antd';
import statesDB from '../../database/states.json';
import { useSelector } from 'react-redux';
import { WarningFilled } from '@ant-design/icons';

const MapButtons = ({ scrollEnabled, map, usZips }) => {
  const [stateName, zipCode] = useSelector(state => [
    state.filters.stateName,
    state.filters.zipCode,
  ]);

  // ----- setting up state jump
  if (stateName) {
    const selectedState = statesDB.filter(state => {
      return state.state === stateName;
    });

    map.jumpTo({
      center: [selectedState[0].longitude, selectedState[0].latitude],
      zoom: 7,
      essential: true,
    });
  }

  // --- setting up zipCode jump
  if (usZips[zipCode]) {
    map.jumpTo({
      center: [usZips[zipCode].longitude, usZips[zipCode].latitude],
      zoom: 12,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  }

  return (
    <div>
      <Button
        type="primary"
        className="appear"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          if (scrollEnabled) {
            map.scrollZoom.disable();
            scrollEnabled = false;
          } else {
            map.scrollZoom.enable();
            scrollEnabled = true;
          }
        }}
      >
        Scroll Zoom
      </Button>

      <Button
        type="primary"
        className="appear"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          marginTop: '68px',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          map.jumpTo({
            center: [-95.712891, 37.09024],
            zoom: 2,
          });
        }}
      >
        Reset Map View
      </Button>

      <Button
        type="primary"
        id="showBtn"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          display: 'none',
        }}
        onClick={() => {
          const hiddenButtons = document.getElementsByClassName('appear');
          for (let i = 0; i < hiddenButtons.length; i++) {
            hiddenButtons[i].style.display = 'block';
          }
          document.getElementById('showBtn').style.display = 'none';
          document.getElementById('hideBtn').style.display = 'block';
        }}
      >
        Show Map Options 🔽
      </Button>

      <Button
        type="primary"
        id="hideBtn"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          marginTop: '102px',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          const hiddenButtons = document.getElementsByClassName('appear');
          for (let i = 0; i < hiddenButtons.length; i++) {
            hiddenButtons[i].style.display = 'none';
          }
          document.getElementById('showBtn').style.display = 'block';
          document.getElementById('hideBtn').style.display = 'none';
        }}
      >
        Hide Map Options 🔼
      </Button>

      <div id="disappear">
        <Result
          status="warning"
          icon={<WarningFilled style={{ color: 'red', fontSize: '6rem' }} />}
          title={
            <div>
              <div style={{ color: 'white' }}>
                THIS SITE MAY CONTAIN GRAPHIC IMAGES
              </div>
              <h5 style={{ color: 'rgb(94,0,0)' }}>
                ⚠ &emsp; Not safe for use in the workplace &emsp; ⚠
              </h5>
            </div>
          }
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(2, 5, 5, 0.9)',
          }}
          extra={
            <Button
              danger
              key="console"
              size="large"
              type="primary"
              onClick={() => {
                if (scrollEnabled) {
                  map.scrollZoom.disable();
                  scrollEnabled = false;
                } else {
                  map.scrollZoom.disable();
                  scrollEnabled = false;

                  setTimeout(() => {
                    document.getElementById('disappear').style.transition =
                      'opacity 1s linear';
                    document.getElementById('disappear').style.opacity = 0;
                  }, 1000);
                  setTimeout(() => {
                    document.getElementById('disappear').style.display = 'none';
                  }, 2000);
                  const hiddenButtons = document.getElementsByClassName(
                    'appear'
                  );
                  for (let i = 0; i < hiddenButtons.length; i++) {
                    setTimeout(() => {
                      hiddenButtons[i].style.display = 'block';

                      document.getElementById('hideBtn').style.display =
                        'block';
                    }, 900);
                    setTimeout(() => {
                      hiddenButtons[i].style.transition = 'opacity 1s linear';
                      hiddenButtons[i].style.opacity = 1;

                      document.getElementById('hideBtn').style.transition =
                        'opacity 1s linear';
                      document.getElementById('hideBtn').style.opacity = 1;
                    }, 1200);
                  }
                }
              }}
            >
              Proceed
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default MapButtons;
