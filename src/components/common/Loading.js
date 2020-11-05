import React, { useState } from 'react';
import Map from '../common/Map';
import Stats from '../pages/Stats';
import About from '../pages/About';
import 'antd/dist/antd.css';
import '../../styles/index.css';
import { Tabs, Button, Popover } from 'antd';

export const Loading = () => {
  const { TabPane } = Tabs;

  return (
    <div>
      <main>
        <Tabs defaultActiveKey="1" type="card" size="large">
          <TabPane tab="Map" key="1">
            <div id="map" style={{ display: 'block' }}>
              {<Map />}
            </div>
          </TabPane>
          <TabPane tab="Stats" key="2" style={{ backgroundColor: '#191a1a' }}>
            <div id="graph">{<Stats />}</div>
          </TabPane>
          <TabPane tab="About" key="3">
            <div id="about">{<About />}</div>
          </TabPane>
        </Tabs>
      </main>
      <footer className="page-footer">
        <small>© Copyright 2020. All rights reserved.</small>
        <ul></ul>
      </footer>
    </div>
  );
};
