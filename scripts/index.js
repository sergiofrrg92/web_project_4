const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');

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


function loadCard(name, link){
  const photoCardTemplate = document.querySelector("#photo-card__template").content;
  const photoGrid = document.querySelector(".photos__grid");
  const photoCard = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
    photoCard.querySelector(".photo-card__photo").src=link;
    photoCard.querySelector(".photo-card__photo").setAttribute("alt", name);
    photoCard.querySelector(".photo-card__title").textContent = name;

    photoGrid.append(photoCard);
}

function loadCards(){
  initialCards.forEach((card) => {
    loadCard(card.name, card.link);
  });
}

function openEditPopUp(){
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupEdit.classList.add("popup_opened");
}

function hideEditPopUp(){
  popupEdit.classList.remove("popup_opened");
}

function openAddPopUp(){
  //TODO
  popupAdd.classList.add("popup_opened");
}

function hideAddPopUp(){
  popupAdd.classList.remove("popup_opened");
}

function handleNewPlaceFormSubmit(evt){
  evt.preventDefault();
  hideAddPopUp();
  loadCard(titleInput.value, linkInput.value);
}

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  hideEditPopUp();
}

loadCards();


addButton.addEventListener("click", openAddPopUp);
closeButtonAdd.addEventListener("click", hideAddPopUp);
formAdd.addEventListener("submit", handleNewPlaceFormSubmit);
editButton.addEventListener("click", openEditPopUp);
closeButtonEdit.addEventListener("click", hideEditPopUp);
formEdit.addEventListener("submit", handleProfileFormSubmit);
