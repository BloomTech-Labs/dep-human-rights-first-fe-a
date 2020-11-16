// UIKit
import '../node_modules/uikit/dist/css/uikit.min.css';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.min.js';

import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './state/reducers/';
import thunk from 'redux-thunk';

import Header from './components/common/Header';

import { VisualizationPage } from './components/pages/Visualization';
import { MapPage } from './components/pages/Map';
import { IncidentsPage } from './components/pages/Incidents';
import { StatsPage } from './components/pages/Stats';
import { FatalityPage } from './components/pages/Fatality';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={VisualizationPage} />
        <Route exact path="/map" component={MapPage} />
        <Route exact path="/incidents" component={IncidentsPage} />
        <Route exact path="/stats" component={StatsPage} />
        <Route exact path="/fatality" component={FatalityPage} />
      </Switch>
    </>
  );
}
