import { Provider } from 'react-redux'
import store from './store';
import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Button from './components/button';
import Modal from './components/modal';
import Logo from './components/logo';
import List from './components/list';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Button/>
    <Modal/>
    <Logo/>
    <List/>
  </Provider>
);
