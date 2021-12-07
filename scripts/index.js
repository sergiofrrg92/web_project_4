const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

const form = popup.querySelector('.form');
const nameInput = form.querySelector('.form__text-input[name="name"]');
const descriptionInput = form.querySelector('.form__text-input[name="about-me"]');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

function openPopUp(){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popup.classList.add("popup_opened");
}

function hidePopUp(){
  popup.classList.remove("popup_opened");
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  hidePopUp();
}

editButton.addEventListener("click", openPopUp);
closeButton.addEventListener("click", hidePopUp);
form.addEventListener("submit", handleProfileFormSubmit);
