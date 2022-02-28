import "./index.css";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js"
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js"

//TODO how to use it on PopupForm when opening it, to retrieve the info.
const userSelectors = {
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__photo"
};

const initialUserInfo = {
  newName: "Jacques Cousteau",
  newJob: "Explorer"
};

/** Declaration of the Popups */
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupPhoto = document.querySelector('.popup-photo');
const popupDelete = document.querySelector('.popup-delete')
const popupEditAvatar = document.querySelector('.popup-edit-avatar');

/** Declaration of the Close Buttons */
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button');
const closeButtonDelete = popupDelete.querySelector('.popup__close-button');
const closeButtonEditAvatar = popupEditAvatar.querySelector('.popup__close-button');

/** Declaration of the Forms */

const formEditName = 'edit-form';
const formAddName = 'add-form';
const formDeleteName = 'delete-form';
const formEditAvatarName = 'edit-avatar-form';

const formEdit = popupEdit.querySelector('.form');
const nameInput = formEdit.querySelector('.form__text-input[name="name"]');
const descriptionInput = formEdit.querySelector('.form__text-input[name="about-me"]');

const formAdd = popupAdd.querySelector('.form');
const titleInput = formAdd.querySelector('.form__text-input[name="title"]');
const linkInput = formAdd.querySelector('.form__text-input[name="image-link"]');

const formEditAvatar = popupEditAvatar.querySelector('.form');
const avatarLinkInput = formEditAvatar.querySelector('.form__text-input[name="avatar-link"]');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
const editAvatarButton = profile.querySelector(".profile__photo-edit-button");

/** Declaration of the Photos */
const photoGridSelector = ".photos__grid";
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
let cardToDelete;

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
 * Handles card creation on Section
 * @param {string} name - The title of the card
 * @param {string} link - The link of the photo
 */
function renderCard(card) {
  const newCard = new Card(card, photoCardTemplate, handleCardClick,  handleCardDeleteClick, handleLikeClick);
  const photoCard = newCard.createCard();
  newCard.updateLikes(newCard._likes, userInfo._id);
  return photoCard;
}

/**
 * Handles new place form submit (Sent to popupWithForm)
 */
function handleNewPlaceFormSubmit() {
  const card = {
    cardName: titleInput.value,
    cardLink: linkInput.value
  };

  this._submitButton.textContent = "Saving...";
  api.setNewCard(card)
    .then(res => {
      const newCard = new Card(res, photoCardTemplate, handleCardClick, handleCardDeleteClick, handleLikeClick);
      section.addItem(newCard.createCard());
      newCard.updateLikes(newCard._likes, userInfo._id);
      })
    .finally(() => {
        this.close();
        this._submitButton.textContent = "Create";
    })
}

/**
 * Handles new profile form submit (Sent to popupWithForm)
 */
function handleProfileFormSubmit() {
  this._submitButton.textContent = "Saving...";
  api.setUserInfo({ newName: nameInput.value, newAbout: descriptionInput.value })
  .then( res => {
    userInfo.setUserInfo(res);
  })
  .finally(() => {
    this.close();
    this._submitButton.textContent = "Save";
  })
}

/**
 * Deletes the selected Card
 */
function handleDeleteFormSubmit() {
  this._submitButton.textContent = "Deleting...";
  api.deleteCard(cardToDelete.getId())
    .then(() => {
      cardToDelete.deleteCard();
      cardToDelete=null;
    }).finally(() => {
      this.close();
      this._submitButton.textContent = "Yes";
    })
}

/**
 * Updates the avatar photo
 */
function handleEditAvatarFormSubmit() {
  this._submitButton.textContent = "Saving...";

  api.updateAvatar(avatarLinkInput.value)
    .then((res) => {
      console.log("Avatar updated ",res);
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      this.close();
      this._submitButton.textContent = "Save";
  })
}

/**
 * Handles open photo on card click (sent to popupWithCard)
 */
function handleCardClick() {
  photoPopup.open(this._image, this._name);
}

function handleCardDeleteClick() {
  deletePopup.open();
  cardToDelete = this;
}

/**
 * Calls the API to add/remove a like to the list depending on the isLiked param.
 * @param {boolean} isLiked
 */
function handleLikeClick(isLiked) {
  if(isLiked) {
    api.addLike(this.getId())
      .then((res) => {
        console.log("Like added succesfully", res.likes);
        this.updateLikes(res.likes, userInfo._id);
      })
  } else {
    api.removeLike(this.getId())
      .then((res) => {
        console.log("Like removed succesfully", res.likes);
        this.updateLikes(res.likes, userInfo._id);
      })
  }
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
 * Setting up the Api class
 */
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "b9d1c3b6-c0f4-4224-ad8f-4c81efa3f89d",
    "Content-Type": "application/json"
  }
});

const userInfo = new UserInfo(userSelectors);

/** User information loading */
api.getUserInfo()
  .then(res => {
    console.log(res);
    userInfo.setUserInfo(res);
  })

/**
 * Loading cards with Section
 */

let section;

api.getInitialCards()
  .then(res => {
    section = new Section( {
      items: res,
      renderer: renderCard
    },
    photoGridSelector);

    section.renderer();

});

/** Popup loading and event listener setup */
const addPopup = new PopupWithForm('.popup-add', handleNewPlaceFormSubmit);
const editPopup = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
const deletePopup = new PopupWithForm('.popup-delete', handleDeleteFormSubmit);
const photoPopup = new PopupWithImage('.popup-photo');
const editAvatarPopup = new PopupWithForm('.popup-edit-avatar', handleEditAvatarFormSubmit);

/** Enable Validation */
enableFormValidationOnAllForms();


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
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  descriptionInput.value = currentUserInfo.job;
  editPopup.open();
  forms.get(formEditName).resetValidation();
});

closeButtonEdit.addEventListener("click", () => {
  editPopup.close();
});

/** Photo popup */

closeButtonPhoto.addEventListener("click", () => {
  photoPopup.close();
});

/** Edit avatar popup */
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  forms.get(formEditAvatarName).resetValidation();
});

closeButtonEditAvatar.addEventListener("click", () => {
  editAvatarPopup.close();
});

/** Delete popup */
closeButtonDelete.addEventListener("click", () => {
  deletePopup.close();
});



