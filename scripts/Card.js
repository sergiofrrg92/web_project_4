import {openPopUp} from "./utils.js"

const popupPhoto = document.querySelector('.popup-photo');


class Card {

    constructor({ name, link }, cardSelector) {

        this._name = name;
        this._image = link;
        this._cardSelector = cardSelector;
    }

        /**
     * Creates one single photo card with specified card information (object)
     * @param {object} card
     * @returns photoCard to be rendered
     */
    createCard() {
        const photoCard = this._createNewPhotoCardElement();
        this._addEventListeners(photoCard);
        this._element = photoCard;

        return photoCard;

    }

    _addEventListeners(photoCard){

        const likeButton = photoCard.querySelector(".photo-card__like-button");
        this._addLikeEventListener(likeButton);

        const deleteButton = photoCard.querySelector(".photo-card__delete-button");
        this._addDeleteEventListener(deleteButton);

        const photo = photoCard.querySelector('.photo-card__photo');
        this._addOpenPhotoEventListener(photo);
    }

    _createNewPhotoCardElement(){
        const photoCard = this._cardSelector.querySelector(".photo-card").cloneNode(true);

        const photo = photoCard.querySelector('.photo-card__photo');
        const photoTitle = photoCard.querySelector(".photo-card__title");

        photo.src = this._image;
        photo.alt = this._name;
        photoTitle.textContent = this._name;

        return photoCard;
    }

    _addLikeEventListener(likeButton) {
        likeButton.addEventListener("click", () => {
            this._element.querySelector('.photo-card__like-button').classList.toggle('photo-card__like-button_active');
        });
    }

    _addDeleteEventListener(deleteButton) {
        deleteButton.addEventListener("click", () => {
            this._element.remove();
        });
    }

    _addOpenPhotoEventListener(photo) {
        photo.addEventListener("click", (evt) => {
          this._handleOpenPhotoEvent(evt);
          openPopUp(popupPhoto);
        });
    }

    _handleOpenPhotoEvent() {
        const photoContainer = popupPhoto.querySelector('.popup-photo__container');
        const photo = photoContainer.querySelector('.popup-photo__photo');
        const title = photoContainer.querySelector('.popup-photo__title');

        photo.src = this._image;
        title.textContent = this._name;
        photo.alt = this._name;
      }


}

export {Card}
