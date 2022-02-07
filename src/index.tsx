import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import './style/style.scss';
import { App } from './core/App';

const root = document.getElementById('root');
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, root);
