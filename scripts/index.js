let popup = document.querySelector('.popup');

function togglePopUp(){
  popup.classList.toggle("popup_opened");
}

let editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", togglePopUp);
