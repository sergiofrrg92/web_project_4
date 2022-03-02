import "./index.css";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js"
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js"
import * as constants from "../utils/constants";

let cardToDelete;

/**
 * Handles card creation on Section
 * @param {string} name - The title of the card
 * @param {string} link - The link of the photo
 */
function renderCard(card) {
  const newCard = new Card(card, constants.photoCardTemplate, handleCardClick,  handleCardDeleteClick, handleLikeClick);
  const photoCard = newCard.createCard();
  newCard.updateLikes(newCard._likes, userInfo._id);
  return photoCard;
}

/**
 * Handles new place form submit (Sent to popupWithForm)
 */
function handleNewPlaceFormSubmit() {
  const card = {
    cardName: constants.titleInput.value,
    cardLink: constants.linkInput.value
  };

  this._submitButton.textContent = "Saving...";
  api.setNewCard(card)
    .then(res => {
      const newCard = new Card(res, constants.photoCardTemplate, handleCardClick, handleCardDeleteClick, handleLikeClick);
      section.addItem(newCard.createCard());
      newCard.updateLikes(newCard._likes, userInfo._id);
      this.close();
      })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      this._submitButton.textContent = "Create";
    })
}

/**
 * Handles new profile form submit (Sent to popupWithForm)
 */
function handleProfileFormSubmit() {
  this._submitButton.textContent = "Saving...";
  api.setUserInfo({ newName: constants.nameInput.value, newAbout: constants.descriptionInput.value })
  .then( res => {
    userInfo.setUserInfo(res);
    this.close();
  })
  .catch( err => {
    console.log(err);
  })
  .finally(() => {
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
      this.close();
    })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      this._submitButton.textContent = "Yes";
    })
}

/**
 * Updates the avatar photo
 */
function handleEditAvatarFormSubmit() {
  this._submitButton.textContent = "Saving...";

  api.updateAvatar(constants.avatarLinkInput.value)
    .then((res) => {
      console.log("Avatar updated ",res);
      userInfo.setUserInfo(res);
      this.close();
    })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
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
      .catch( err => {
        console.log(err);
      })
  } else {
    api.removeLike(this.getId())
      .then((res) => {
        console.log("Like removed succesfully", res.likes);
        this.updateLikes(res.likes, userInfo._id);
      })
      .catch( err => {
        console.log(err);
      })
  }
}

/**
 * Enables validation on all forms.
 * Saves the formValidators on a Map for future access
 */
function enableFormValidationOnAllForms() {
  const formList = Array.from(document.querySelectorAll(constants.validationConfig.formSelector));
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute("name");
    const formValidator = new FormValidator(constants.validationConfig, formElement);
    formValidator.enableValidation();
    constants.forms.set(formName, formValidator);
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

console.log(constants);
const userInfo = new UserInfo(constants.userSelectors);

/** User information loading */
api.getUserInfo()
  .then(res => {
    console.log(res);
    userInfo.setUserInfo(res);
  })
  .catch( err => {
    console.log(err);
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
    constants.photoGridSelector);

    section.renderer();

})
.catch( err => {
  console.log(err);
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
constants.addButton.addEventListener("click", () => {
  addPopup.open();
  constants.forms.get(constants.formAddName).resetValidation();
});

constants.closeButtonAdd.addEventListener("click", () => {
  addPopup.close();
});


/** Edit Popup and Form */
constants.editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  constants.nameInput.value = currentUserInfo.name;
  constants.descriptionInput.value = currentUserInfo.job;
  editPopup.open();
  constants.forms.get(constants.formEditName).resetValidation();
});

constants.closeButtonEdit.addEventListener("click", () => {
  editPopup.close();
});

/** Photo popup */

constants.closeButtonPhoto.addEventListener("click", () => {
  photoPopup.close();
});

/** Edit avatar popup */
constants.editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  constants.forms.get(constants.formEditAvatarName).resetValidation();
});

constants.closeButtonEditAvatar.addEventListener("click", () => {
  editAvatarPopup.close();
});

/** Delete popup */
constants.closeButtonDelete.addEventListener("click", () => {
  deletePopup.close();
});



