// UIKit
import '../node_modules/uikit/dist/css/uikit.min.css';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.min.js';

import './index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './state/reducers/';
import thunk from 'redux-thunk';

import Header from './components/common/Header';
import Footer from './components/common/Footer';

import { VisualizationPage } from './components/pages/Visualization';

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
      <Router>
        <Route exact path="/" component={VisualizationPage} />
      </Router>
      {/* <Footer /> */}
    </>
  );
}
