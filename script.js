console.log("Engineering Training!");

const modalButton = document.getElementById("modalButton");

console.log("modalButton", modalButton);

modalButton.addEventListener("click", whenClicked);

function whenClicked() {
  console.log("Clicked!");
  let modalContainer = document.getElementById("modal");
  modalContainer.classList.toggle("hidden");
}

const closeModalButton = document.getElementsByClassName("closeModal");

closeModalButton[0].addEventListener("click", whenCloseClicked);

console.log("closeModal", closeModalButton);

function whenCloseClicked() {
  console.log("Clicked Close!");
  let modalContainer = document.getElementById("modal");
  modalContainer.classList.toggle("hidden");
}
