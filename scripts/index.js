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
  }/*,
  {
    name: "St. Nicholas of Bujaruelo",
    link: "https://images.unsplash.com/photo-1618982469792-9165dfb75f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Glendalough",
    link: "https://images.unsplash.com/photo-1571092459778-976489055d5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    name: "Helsinki",
    link: "https://images.unsplash.com/photo-1522885147691-06d859633fb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }*/
];

/**
 * Creates one single photo card with specified card information (object)
 * @param {object} card
 * @returns photoCard to be rendered
 */
function createCard(card) {
  const photoCard = photoCardTemplate.querySelector(".photo-card").cloneNode(true);

  const photo = photoCard.querySelector('.photo-card__photo');
  const photoTitle = photoCard.querySelector(".photo-card__title");

  photo.src = card.link;
  photo.setAttribute("alt", card.name);

  photoTitle.textContent = card.name;

  const likeButton = photoCard.querySelector(".photo-card__like-button");
  addLikeEventListener(likeButton);

  const deleteButton = photoCard.querySelector(".photo-card__delete-button");
  addDeleteEventListener(deleteButton);

  addOpenPhotoEventListener(photo);

  return photoCard;

}

/**
 * Renders the card created by createCard()
 * @param {string} name - The title of the card
 * @param {string} link - The link of the photo
 */
function renderCard(card) {
  const photoCard = createCard(card);
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

/**
 * Opens the popup received
 * @param {*} popup
 */
function openPopUp(popup) {
  popup.classList.add("popup_opened");

}

/**
 * Closes the popup received
 * @param {*} popup
 */
function hidePopUp(popup) {
  popup.classList.remove("popup_opened");
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

function addLikeEventListener(likeButton) {
  likeButton.addEventListener("click", function(evt) {
    evt.target.classList.toggle('photo-card__like-button_active');
  });
}

function addDeleteEventListener(deleteButton) {
  deleteButton.addEventListener("click", function(evt){
    evt.target.closest('.photo-card').remove();
  });
}

function handleOpenPhotoEvent(evt) {
  const photoCard = evt.target.closest('.photo-card');
  const photoContainer = popupPhoto.querySelector('.popup-photo__container');
  const photo = photoContainer.querySelector('.popup-photo__photo');
  const title = photoContainer.querySelector('.popup-photo__title');

  photo.src = photoCard.querySelector('.photo-card__photo').src;
  title.textContent = photoCard.querySelector('.photo-card__title').textContent;
  photo.setAttribute("alt", photoCard.querySelector('.photo-card__title').textContent);
}

function addOpenPhotoEventListener(photo) {
  photo.addEventListener("click", (evt) => {
    handleOpenPhotoEvent(evt);
    openPopUp(popupPhoto);
  });
}

/**
 * Adds event listeners to popup overlays to close on click.
 */
function addClosePopupEventListenerToOverlay(){
  const popupList = Array.from(popups);
  popupList.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      console.log(Array.from(evt.target.classList));
      if(evt.target.classList.contains("popup")){
        hidePopUp(popup);
      }
    });
    document.addEventListener("keydown", (evt) => {
      const openedPopup = document.querySelector('.popup_opened')
      if(evt.key == "Escape" && openedPopup){
        hidePopUp(openedPopup);
      }

      //hidePopUp(popup);
    });
  });
}

loadCards();

/** Declaration of the event listeners */

/** Add Popup and Form */
addButton.addEventListener("click", () => {
  openPopUp(popupAdd);
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
});

closeButtonEdit.addEventListener("click", () => {
  hidePopUp(popupEdit);
});

formEdit.addEventListener("submit", handleProfileFormSubmit);

/** Photo popup */

closeButtonPhoto.addEventListener("click", () => {
  hidePopUp(popupPhoto);
});

addClosePopupEventListenerToOverlay();




