import { Flag, People, Map as Mp } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import OldMap from './OldMap';
import Map from '../common/Map';
import Graph from '../common/Graph';
import FiltersForm from './FilterForm';
import 'antd/dist/antd.css';
import '../../styles/index.css';
import { Tabs, Button, Popover } from 'antd';

export const Loading = () => {
  // const [viewIndex, setViewIndex] = useState(0);

  // const views = ['map', 'graph'];
  // const otherView = views[views.length - 1 - viewIndex];

  const { TabPane } = Tabs;

  const openFilters = (
    <Popover
      placement="bottomRight"
      title={<span>Filter Your Results</span>}
      content={<FiltersForm />}
      trigger="click"
    >
      <Button type="link">Open Filters</Button>
    </Popover>
  );

  // <div className="filter">
  //         <FiltersForm />
  //       </div>

  // const toggleViewIndex = () => {
  //   const mapContainer = document.querySelector('#map');

  //   viewIndex === 0 ? setViewIndex(1) : setViewIndex(0);

  //   if (mapContainer.style.display === 'block') {
  //     mapContainer.style.display = 'none';
  //   } else {
  //     mapContainer.style.display = 'block';
  //   }
  // };

  return (
    <div>
      <main>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          tabBarExtraContent={openFilters}
        >
          <TabPane tab="Map" key="1">
            <div id="map" style={{ display: 'block' }}>
              <Map />
            </div>
          </TabPane>
          <TabPane tab="Graph" key="2">
            <div id="graph">
              <Graph />
            </div>
          </TabPane>
          <TabPane tab="About" key="3">
            <div className="last-section">
              <section className="intro" id="about">
                <h2>What is Human Rights Considered?</h2>
                <div className="icons">
                  <div>
                    <Flag />
                  </div>
                  <div>
                    <People />
                  </div>
                  <div>
                    <Mp />
                  </div>
                </div>
                <p className="considered">
                  Human Rights Considered is a public police brutality incident
                  viewing application.
                  <br />
                  <br /> Our goal is to provide information regarding a variety
                  of police brutality incidents in an accurate and timely manner
                  to public. The incidents have been categorized and can be
                  filtered by types of force, location, and date.
                </p>
              </section>
              <section className="middle">
                <div className="middle-content">
                  <h1 className="mid-title">How it works?</h1>
                  <p className="mid-text">
                    We collect relevant incidents data from Twitter, Reddit, and
                    police agencies to display it on the map.
                  </p>
                </div>
              </section>
              <section className="bottom-section">
                <h2>About Human Rights First</h2>
                <div className="bottom">
                  <img
                    src="https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/423165_10150686770200747_669805325_n.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_ohc=-TaZmzOKohgAX8W3jk4&_nc_ht=scontent-sjc3-1.xx&oh=88b11d2fdc32243402fed9c37667b936&oe=5F8F34C8"
                    alt="humane-right-first-logo"
                  />
                  <p className="organization">
                    Human Rights First is an independent advocacy and action
                    organization that challenges America to live up to its
                    ideals. We believe American leadership is essential in the
                    global struggle for human rights, so we press the U.S.
                    government and private companies to respect human rights and
                    the rule of law. When they fail, we step in to demand
                    reform, accountability and justice. Around the world, we
                    work where we can best harness American influence to secure
                    core freedoms.
                  </p>
                </div>
                <a href="#" className="back-to-top">
                  back to top {'  '}
                  <i class="fa fa-chevron-up"></i>
                </a>
              </section>
            </div>
          </TabPane>
        </Tabs>
        {/* <button
          onClick={toggleViewIndex}
          style={{ zIndex: 20, position: 'relative' }}
        >
          {otherView}
        </button>
        <div id="map" style={{ display: 'block' }}>
          {views[viewIndex] === 'map' && <Map />}
        </div>
        <div id="graph">{views[viewIndex] === 'graph' && <Graph />}</div> */}
      </main>
      <footer className="page-footer">
        <small>© Copyright 2020. All rights reserved.</small>
        <ul></ul>
      </footer>
    </div>
  );
};
