import {openPopUp} from "./utils.js"

class Card {

    constructor(cardData, cardSelector) {
        this._name = cardData.name;
        this._image = cardData.link;
        this._cardSelector = cardSelector;
        this._popupPhoto = document.querySelector('.popup-photo');
    }

        /**
     * Creates one single photo card with specified card information (object)
     * @param {object} card
     * @returns photoCard to be rendered
     */
    createCard() {
        const photoCard = this._cardSelector.querySelector(".photo-card").cloneNode(true);
    
        const photo = photoCard.querySelector('.photo-card__photo');
        const photoTitle = photoCard.querySelector(".photo-card__title");
    
        photo.src = this._image;
        photo.alt = this._name;
        photoTitle.textContent = this._name;
    
        const likeButton = photoCard.querySelector(".photo-card__like-button");
        this._addLikeEventListener(likeButton);
    
        const deleteButton = photoCard.querySelector(".photo-card__delete-button");
        this._addDeleteEventListener(deleteButton);
    
        this._addOpenPhotoEventListener(photo);
    
        return photoCard;
    
    }

    _addLikeEventListener(likeButton) {
        likeButton.addEventListener("click", this._handleLikeEvent);
    }

    _handleLikeEvent(evt) {
        evt.target.classList.toggle('photo-card__like-button_active');
      }

    _addDeleteEventListener(deleteButton) {
        deleteButton.addEventListener("click", this._handleDeletePhotoEvent);
    }

    _handleDeletePhotoEvent(evt) {
        evt.target.closest('.photo-card').remove();
      }

    _addOpenPhotoEventListener(photo) {
        photo.addEventListener("click", (evt) => {
          this._handleOpenPhotoEvent(evt);
          openPopUp(this._popupPhoto);
        });
    }

    _handleOpenPhotoEvent(evt) {
        const photoCard = evt.target.closest('.photo-card');
        const photoContainer = this._popupPhoto.querySelector('.popup-photo__container');
        const photo = photoContainer.querySelector('.popup-photo__photo');
        const title = photoContainer.querySelector('.popup-photo__title');
      
        photo.src = photoCard.querySelector('.photo-card__photo').src;
        title.textContent = photoCard.querySelector('.photo-card__title').textContent;
        photo.alt = photoCard.querySelector('.photo-card__title').textContent;
      }
    

}

export {Card}