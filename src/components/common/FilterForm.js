import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Select,
  Input,
  Checkbox,
  Button,
  Typography,
  DatePicker,
  Row,
  Col,
} from 'antd';
import { updateFilters } from '../../state/actions/';
import 'antd/dist/antd.css';
import './FilterForm.css';
import statesDB from '../../database/states.json';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

export default function FiltersForm() {
  const initialIncidents = {
    energyDevices: true,
    soft: true,
    hard: true,
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
    'Soft',
    'Hard',
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
      <div className="search-bars">
        <RangePicker />
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
        <Button type="link" onClick={() => console.log('reset filters')}>
          Reset Filters
        </Button>
      </div>
      <div className="filter-types">
        <div className="incident-filters">
          <Title level={5}>Incident Type</Title>
          <div className="checkboxes">
            <Checkbox.Group style={{ width: '100%' }} defaultValue={incidents}>
              <Row>
                {incidents.map((incident, id) => {
                  return (
                    <Col span={6}>
                      <Checkbox
                        value={incident}
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
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </div>
        </div>

        <div className="source-filters">
          <Title level={5}>Source Type</Title>
          <div className="checkboxes">
            <Checkbox.Group style={{ width: '100%' }} defaultValue={sources}>
              <Row>
                {sources.map((source, id) => {
                  return (
                    <Col span={12}>
                      <Checkbox
                        value={source}
                        defaultChecked="true"
                        onChange={() => console.log({ source })}
                      >
                        {source}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
