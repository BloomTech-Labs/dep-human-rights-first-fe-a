// UIKit
import '../node_modules/uikit/dist/css/uikit.min.css';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.min.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import 'antd/dist/antd.less';

import reducer from './state/reducers/';
import { Loading } from './components/common/Loading';
import thunk from 'redux-thunk';

// import Page from './components/pages/ProfileList'  <----

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  return (
    <Router>
      <Route exact path="/" component={Loading} />
    </Router>
  );
}
