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
function handleNewPlaceFormSubmit(popup, inputData) {
  const cardData = {
    cardName: inputData["title"],
    cardLink: inputData["image-link"]
  };
  popup.setButtonText("Saving...");
  api.setNewCard(cardData)
    .then(res => {
      section.addItem(renderCard(res));
      popup.close();
      })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      popup.setButtonText("Create");
    })
}

/**
 * Handles new profile form submit (Sent to popupWithForm)
 */
function handleProfileFormSubmit(popup, inputData) {
  popup.setButtonText("Saving...");
  api.setUserInfo({ newName: inputData["name"], newAbout: inputData["about-me"] })
  .then( res => {
    userInfo.setUserInfo(res);
    popup.close();
  })
  .catch( err => {
    console.log(err);
  })
  .finally(() => {
    popup.setButtonText("Save");
  })
}

/**
 * Deletes the selected Card
 */
function handleDeleteFormSubmit(popup) {
  popup.setButtonText("Deleting...");
  api.deleteCard(cardToDelete.getId())
    .then(() => {
      cardToDelete.deleteCard();
      cardToDelete=null;
      popup.close();
    })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      popup.setButtonText("Yes");
    })
}

/**
 * Updates the avatar photo
 */
function handleEditAvatarFormSubmit(popup, inputData) {
  popup.setButtonText("Saving...");
  api.updateAvatar(inputData["avatar-link"])
    .then((res) => {
      console.log("Avatar updated ",res);
      userInfo.setUserInfo(res);
      popup.close();
    })
    .catch( err => {
      console.log(err);
    })
    .finally(() => {
      popup.setButtonText("Save");
  })
}

/**
 * Handles open photo on card click (sent to popupWithCard)
 */
function handleCardClick(card) {
  photoPopup.open(card.getImageLink(), card.getName());
}

function handleCardDeleteClick(card) {
  deletePopup.open();
  cardToDelete = card;
}

/**
 * Calls the API to add/remove a like to the list depending on the isLiked param.
 * @param {boolean} isLiked
 */
function handleLikeClick(card, isLiked) {
  if(isLiked) {
    api.addLike(card.getId())
      .then((res) => {
        console.log("Like added succesfully", res.likes);
        card.updateLikes(res.likes, userInfo.getId());
      })
      .catch( err => {
        console.log(err);
      })
  } else {
    api.removeLike(card.getId())
      .then((res) => {
        console.log("Like removed succesfully", res.likes);
        card.updateLikes(res.likes, userInfo.getId());
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

const userInfo = new UserInfo(constants.userSelectors);
let section;

/** User and card information loading */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);

    section = new Section( {
      items: cards,
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


/** Edit Popup and Form */
constants.editButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  constants.nameInput.value = currentUserInfo.name;
  constants.descriptionInput.value = currentUserInfo.job;
  editPopup.open();
  constants.forms.get(constants.formEditName).resetValidation();
});


/** Edit avatar popup */
constants.editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  constants.forms.get(constants.formEditAvatarName).resetValidation();
});




