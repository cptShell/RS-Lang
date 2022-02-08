import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './style/style.scss';
import { App } from './core/App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = document.getElementById('root');
const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, root);
