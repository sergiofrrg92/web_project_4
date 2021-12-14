const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

const form = popup.querySelector('.form');
const nameInput = form.querySelector('.form__text-input[name="name"]');
const descriptionInput = form.querySelector('.form__text-input[name="about-me"]');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

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

function loadCards(){
  const photoCardTemplate = document.querySelector("#photo-card__template").content;
  const photoGrid = document.querySelector(".photos__grid");

  initialCards.forEach((card) => {
    const photoCard = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
    photoCard.querySelector(".photo-card__photo").src=card.link;
    photoCard.querySelector(".photo-card__photo").setAttribute("alt", card.name);
    photoCard.querySelector(".photo-card__title").textContent = card.name;

    photoGrid.append(photoCard);
  });


}

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

loadCards();

editButton.addEventListener("click", openPopUp);
closeButton.addEventListener("click", hidePopUp);
form.addEventListener("submit", handleProfileFormSubmit);
