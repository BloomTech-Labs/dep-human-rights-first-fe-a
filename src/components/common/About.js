import React from 'react';
import './About.css';
import { Typography } from 'antd';
import { Flag, People, Map } from 'react-bootstrap-icons';

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div className="about">
      <Title level={1} style={{ color: '#205488' }} className="about-title">
        Welcome to Human Rights Considered
      </Title>
      <div className="icons">
        <div>
          <Flag size={42} style={{ color: '#6487ab' }} />
        </div>
        <div>
          <People size={42} style={{ color: '#6487ab' }} />
        </div>
        <div>
          <Map size={42} style={{ color: '#6487ab' }} />
        </div>
      </div>
      <Paragraph className="p">
        Human Rights Considered is an application designed to help you view and
        study trends in police brutality incidents across the United States. Our
        goal is to provide information regarding a variety of cases to the
        public in an accurate and timely manner.
      </Paragraph>
      <div className="about-feature">
        <Title
          level={1}
          style={{ color: '#f4ebe1', fontSize: '3rem', margin: 0 }}
        >
          How it Works
        </Title>
        <p>
          We collect relevant incidents data from Twitter, Reddit, and police
          agencies to display it on the map.
        </p>
      </div>
      <div className="hrf">
        <img
          src="https://www.humanrightsfirst.org/sites/default/files/hrf-logo.png"
          alt="Human Rights First logo"
        />
        <Paragraph className="p">
          Human Rights First is an independent advocacy and action organization
          that challenges America to live up to its ideals. We believe American
          leadership is essential in the global struggle for human rights, so we
          press the U.S. government and private companies to respect human
          rights and the rule of law. When they fail, we step in to demand
          reform, accountability and justice. Around the world, we work where we
          can best harness American influence to secure core freedoms.
        </Paragraph>
      </div>
    </div>
  );
}
