console.log("Engineering Training!");

const modalButton = document.getElementById("modalButton");

console.log("modalButton", modalButton);

modalButton.addEventListener("click", whenClicked);

function whenClicked() {
  console.log("Clicked!");
  let modalContainer = document.getElementById("modal");
  modalContainer.classList.toggle("hidden");
  console.log(modalContainer.classList);
}
