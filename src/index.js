import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import 'antd/dist/antd.less';

import reducer from './state/reducers/';
import { Loading } from './components/common/Loading';
import NavBar from './components/common/NavBar';

const store = createStore(reducer);

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
      {/* <NavBar /> */}
      <Route exact path="/" component={Loading} />
    </Router>
  );
}
