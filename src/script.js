import React, { Component } from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.Fragment><h1>Hello World!</h1></React.Fragment>,
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

  const utils = {
    loadData: async function (callback) {
      whenCloseClicked();
      const response = await fetch("/getJiraTickets");
      const data = await response.json();
      console.log(data);

      this.renderData(data).then((response) => {
        list[0].innerHTML = response;
        return response;
      });
      callback();

      let modalContainer = document.getElementById("modal");
      modalContainer.classList.add("hidden");
    },
    renderData: function (data) {
      return new Promise((resolve) => {
        let response = "";
        data.jirasObject.forEach((element) => {
          let { link, title, icon } = element;
          response += `<li class="item"><a href= ${link}> 
        <i class="${icon}">
        </i> ${title} 
        </a></li>`;
        });
        resolve(response);
      });
    },
  };

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
