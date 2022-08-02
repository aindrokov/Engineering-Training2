import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './components/button';
import utils from './utils';

ReactDOM.render(
  <Button/>,
  document.getElementById('root')
);

(async function () {
  console.log("Engineering Training!");

  function initModalButton() {
    return new Promise((resolve) => {
      var dataLoaded = false;
      const modalButton = document.getElementById("modalButton");
      modalButton.addEventListener("click", () => {
        if (dataLoaded === false) {
          utils.loadData(() => {
            resolve();
            dataLoaded = true;
          });
        }
      });
    });
  }

  function whenCloseClicked() {
    console.log("Clicked Close!");
    let modalContainer = document.getElementById("modal");
    modalContainer.classList.toggle("hidden");
  }

  const closeModalButton = document.getElementsByClassName("closeModal");

  closeModalButton[0].addEventListener("click", whenCloseClicked);

  const list = document.getElementsByClassName("grid-container");

  console.log("BEFORE initModalButton is called");
  await initModalButton();
  console.log("AFTER initModalButton is called");
})();
