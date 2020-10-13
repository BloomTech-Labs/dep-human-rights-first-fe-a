import React from 'react';
import { Select, Input, Checkbox, Button, Typography } from 'antd';
import 'antd/dist/antd.css';
import './FilterForm.css';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

export default function FiltersForm() {
  const stateNames = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const incidents = [
    'Energy Devices',
    'Soft Technique',
    'Hard Technique',
    'Projectiles',
    'Chemical',
    'Presence',
    'Other',
  ];

  const sources = ['One', 'Two', 'Three', 'Four'];

  return (
    <div className="filter-box">
      <div className="filter-header">
        <Title level={4}>Filter Your Results</Title>
        <div>
          <Button type="link" onClick={() => console.log('reset filters')}>
            Reset Filters
          </Button>
          <Button type="link" onClick={() => console.log('reset map')}>
            Reset Map
          </Button>
        </div>
      </div>
      <div className="all-filters">
        <div className="location-filters">
          <Select placeholder="Select a State" style={{ width: 150 }}>
            {stateNames.map((state, id) => {
              return <Option value={state}>{state}</Option>;
            })}
          </Select>
          <Search
            placeholder="Zip Code"
            onSearch={value => console.log(value)}
            style={{ width: 150 }}
          />
        </div>
        <div className="checkbox-filters">
          <div className="incident-filters">
            <Title level={5}>Incident Type</Title>
            <div className="checkboxes">
              {incidents.map((incident, id) => {
                return (
                  <Checkbox
                    defaultChecked
                    onChange={() => console.log({ incident })}
                  >
                    {incident}
                  </Checkbox>
                );
              })}
            </div>
          </div>

          <div className="source-filters">
            <Title level={5}>Source Type</Title>
            <div>
              {sources.map((source, id) => {
                return (
                  <Checkbox
                    defaultChecked
                    onChange={() => console.log({ source })}
                  >
                    {source}
                  </Checkbox>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
