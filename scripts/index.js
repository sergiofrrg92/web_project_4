import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { openPopUp, hidePopUp } from "./utils.js";

/** Declaration of the Popups */
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');

/** Declaration of the Close Buttons */
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button');

/** Declaration of the Forms */
const formEdit = popupEdit.querySelector('.form');
const nameInput = formEdit.querySelector('.form__text-input[name="name"]');
const descriptionInput = formEdit.querySelector('.form__text-input[name="about-me"]');

const formAdd = popupAdd.querySelector('.form');
const titleInput = formAdd.querySelector('.form__text-input[name="title"]');
const linkInput = formAdd.querySelector('.form__text-input[name="image-link"]');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const addButton = profile.querySelector(".profile__add-button");

/** Declaration of the Photos */
const photoGrid = document.querySelector(".photos__grid");
const photoCardTemplate = document.querySelector("#photo-card__template").content;

/** Declaration of the Initial Cards */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

/** Declaration of the Setting object for card validation */
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__text-input-error_active",
  errorClass: "form__input-error_visible"
};


/**
 * Renders the card created by createCard()
 * @param {string} name - The title of the card
 * @param {string} link - The link of the photo
 */
function renderCard(card) {
  const newCard = new Card(card, photoCardTemplate);
  const photoCard = newCard.createCard();
  photoGrid.prepend(photoCard);
}

/**
 * Initially loads all the cards in the initialCards list
 */
function loadCards() {
  initialCards.forEach((card) => {
    renderCard(card);
  });
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  hidePopUp(popupAdd);
  const card = {
    name: titleInput.value,
    link: linkInput.value
  };
  renderCard(card);
  formAdd.reset();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  hidePopUp(popupEdit);
}


loadCards();

const formValidator = new FormValidator(validationConfig, validationConfig.formSelector);
formValidator.enableValidation();

/** Declaration of the event listeners */

/** Add Popup and Form */
addButton.addEventListener("click", () => {
  openPopUp(popupAdd);
  formValidator.resetValidation(popupAdd.querySelector('.form'));
});

closeButtonAdd.addEventListener("click", () => {
  hidePopUp(popupAdd);
});

formAdd.addEventListener("submit", handleNewPlaceFormSubmit);


/** Edit Popup and Form */
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopUp(popupEdit);
  formValidator.resetValidation(popupEdit.querySelector('.form'));
});

closeButtonEdit.addEventListener("click", () => {
  hidePopUp(popupEdit);
});

formEdit.addEventListener("submit", handleProfileFormSubmit);

/** Photo popup */

closeButtonPhoto.addEventListener("click", () => {
  hidePopUp(popupPhoto);
});





