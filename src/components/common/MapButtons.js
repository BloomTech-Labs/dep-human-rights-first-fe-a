import React from 'react';
import { Button, Result } from 'antd';
import statesDB from '../../database/states.json';
import myImg2 from '../../assets/HRC.png';
import { useSelector } from 'react-redux';
import {
  WarningFilled,
  WarningOutlined,
  WarningTwoTone,
} from '@ant-design/icons';
// const { Search } = Input;
// const { Option } = Select;

const MapButtons = ({ scrollEnabled, map, usZips }) => {
  const [stateName, zipCode] = useSelector(state => [
    state.filters.stateName,
    state.filters.zipCode,
  ]);

  // const filteredStates = statesDB.filter(state => {
  //   return state.state !== 'Alaska' && state.state !== 'Hawaii';
  // });

  // function onChange(value) {
  //   const selectedState = filteredStates.filter(state => {
  //     return state.state === value;
  //   });

  //   map.jumpTo({
  //     center: [selectedState[0].longitude, selectedState[0].latitude],
  //     zoom: 7,
  //     essential: true,
  //   });
  // }

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

      {/* <Select
        showSearch
        placeholder="Select a State"
        className="appear"
        onChange={onChange}
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          top: '6%',
          display: 'none',
          opacity: 0,
        }}
      >
        {filteredStates.map((state, id) => {
          return <Option value={state.state}>{state.state}</Option>;
        })}
      </Select> */}

      {/* <Search
        className="appear"
        placeholder="enter zip-code"
        onSearch={value => {
          if (usZips[value]) {
            map.flyTo({
              center: [usZips[value].longitude, usZips[value].latitude],
              zoom: 12,
              essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            });
          }
        }}
        enterButton
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          top: '9%',
          display: 'none',
          opacity: 0,
        }}
      ></Search> */}

      <Button
        type="primary"
        className="appear"
        style={{
          zIndex: 10,
          position: 'absolute',
          width: '200px',
          top: '6%',
          display: 'none',
          opacity: 0,
        }}
        onClick={() => {
          map.jumpTo({
            center: [-95.712891, 37.09024],
            zoom: 4,
          });
        }}
      >
        Reset Map View
      </Button>

      <div id="disappear">
        <Result
          status="warning"
          icon={<WarningFilled style={{ color: 'red', fontSize: '6rem' }} />}
          title={
            <div style={{ color: 'white' }}>
              THIS SITE CONTAINS IMAGES OF GRAPHIC VIOLENCE
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
                  map.scrollZoom.enable();
                  scrollEnabled = true;

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
        ,
      </div>

      {/* <Button
        type="primary"
        id="disappear"
        danger
        size="large"
        block
        style={{
          zIndex: 10,
          position: 'absolute',
          bottom: '35%',
          backgroundImage: `url(${myImg2})`,
        }}
        onClick={() => {
          if (scrollEnabled) {
            map.scrollZoom.disable();
            scrollEnabled = false;
          } else {
            map.scrollZoom.enable();
            scrollEnabled = true;

            setTimeout(() => {
              document.getElementById('disappear').style.transition =
                'opacity 1s linear';
              document.getElementById('disappear').style.opacity = 0;
            }, 100);
            setTimeout(() => {
              document.getElementById('disappear').style.display = 'none';
            }, 1000);
            const hiddenButtons = document.getElementsByClassName('appear');
            for (let i = 0; i < hiddenButtons.length; i++) {
              setTimeout(() => {
                hiddenButtons[i].style.display = 'block';

                document.getElementById('hideBtn').style.display = 'block';
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
        <WarningOutlined style={{ color: 'red' }} />
        <h2>Start Using Map</h2>
        <Button  style={{
          zIndex: 10,
          position: 'absolute',
          bottom: '35%',
          backgroundImage: `url(${myImg2})`,
        }}>Yes</Button>
        <WarningFilled style={{ color: 'red' }} />
      </Button> */}

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
          top: '9%',
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
    </div>
  );
};

export default MapButtons;
