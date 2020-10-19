import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select, Input, Checkbox, Button, Typography } from 'antd';
import { updateFilters } from '../../state/actions/';
import 'antd/dist/antd.css';
import './FilterForm.css';
import statesDB from '../../database/states.json';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

export default function FiltersForm() {
  const initialIncidents = {
    energyDevices: true,
    softTechnique: true,
    hardTechnique: true,
    projectiles: true,
    chemical: true,
    presence: true,
    other: true,
  };

  const dispatch = useDispatch();
  const [incidentsState, setIncidentsState] = useState(initialIncidents);

  const filteredStates = statesDB.filter(state => {
    return state.state !== 'Alaska' && state.state !== 'Hawaii';
  });


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

  const getKeyFromName = name => {
    let key = [...name].filter(char => char !== ' ');
    key[0] = key[0].toLowerCase();
    key = key.join('');

    return key;
  };

  useEffect(() => {
    dispatch(updateFilters({ incidents: incidentsState }));
  }, [dispatch, incidentsState]);

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
          <Select
            allowClear
            showSearch // useful to not have to scroll through 50+ items to find what you're looking for
            onSelect={stateName => dispatch(updateFilters({ stateName }))}
            placeholder="Select a State"
            style={{ width: 150 }}
          >

            {filteredStates.map(state => {
              return <Option value={state.state}>{state.state}</Option>;

            })}
          </Select>
          <Search
            placeholder="Zip Code"
            allowClear
            onSearch={value => dispatch(updateFilters({ zipCode: value }))}
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
                    onChange={e => {
                      let incidentKey = getKeyFromName(incident);

                      setIncidentsState({
                        ...incidentsState,
                        [incidentKey]: e.target.checked,
                      });
                    }}
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
