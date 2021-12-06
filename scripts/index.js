let popup = document.querySelector('.popup');

function togglePopUp(){
  popup.classList.toggle("popup_opened");
}

let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
editButton.addEventListener("click", togglePopUp);
closeButton.addEventListener("click", togglePopUp);
