import "./styles/index.css";

import { FormValidator } from "./scripts/components/FormValidator.js";
import { Card } from "./scripts/components/Card.js";
import { openPopUp, hidePopUp } from "./scripts/utils.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";

/** Declaration of the Popups */
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');

/** Declaration of the Close Buttons */
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button');

/** Declaration of the Forms */

const formEditName = 'edit-form';
const formAddName = 'add-form';

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

const forms = new Map();

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
  const newCard = new Card(card, photoCardTemplate, handleCardClick);
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

function handleNewPlaceFormSubmit() {
  const card = {
    name: titleInput.value,
    link: linkInput.value
  };
  renderCard(card);
}

function handleProfileFormSubmit() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

function handleCardClick() {
  const popup = new PopupWithImage('.popup-photo');
  popup.setEventListeners();
  popup.open(this._image, this._name);
}

/**
 * Enables validation on all forms.
 * Saves the formValidators on a Map for future access
 */
function enableFormValidationOnAllForms() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute("name");
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
    forms.set(formName, formValidator);
  });
}

/**
 * Loading web page
 */
const addPopup = new PopupWithForm('.popup-add', handleNewPlaceFormSubmit);
addPopup.setEventListeners();
const editPopup = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
editPopup.setEventListeners();
loadCards();
enableFormValidationOnAllForms();
//editPopup.open();


/** Declaration of the event listeners */

/** Add Popup and Form */
addButton.addEventListener("click", () => {
  addPopup.open();
  forms.get(formAddName).resetValidation();
});

closeButtonAdd.addEventListener("click", () => {
  addPopup.close();
});


/** Edit Popup and Form */
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  editPopup.open();
  forms.get(formEditName).resetValidation();
});

closeButtonEdit.addEventListener("click", () => {
  editPopup.close();
});

/** Photo popup */

closeButtonPhoto.addEventListener("click", () => {
  hidePopUp(popupPhoto);
});





