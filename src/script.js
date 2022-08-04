import { Provider } from 'react-redux'
import store from './store';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Button/>
  </Provider>
);
