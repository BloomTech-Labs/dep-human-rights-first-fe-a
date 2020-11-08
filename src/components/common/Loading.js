import React, { useState } from 'react';
import Map from '../common/Map';
import Stats from '../pages/Stats';
import 'antd/dist/antd.css';
import '../../styles/index.css';
import { Tabs, Button, Popover } from 'antd';
import Mapbox from './Mapbox';

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
          <TabPane tab="Mapbox">
            <Mapbox />
          </TabPane>
        </Tabs>
      </main>
    </div>
  );
};
