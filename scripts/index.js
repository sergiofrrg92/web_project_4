const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

const form = popup.querySelector('.form');
const nameInput = form.querySelector('.form__text-input[name="name"]');
const descriptionInput = form.querySelector('.form__text-input[name="about-me"]');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');



function togglePopUp(){
  popup.classList.toggle("popup_opened");
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  togglePopUp();
}

editButton.addEventListener("click", togglePopUp);
closeButton.addEventListener("click", togglePopUp);
form.addEventListener("submit", handleProfileFormSubmit);
