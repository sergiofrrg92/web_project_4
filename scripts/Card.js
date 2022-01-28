class Card {
    constructor(cardData, cardSelector) {
        this._text = cardData.text;
        this._image = cardData.image;
        this._cardSelector = cardSelector;
    }

        /**
     * Creates one single photo card with specified card information (object)
     * @param {object} card
     * @returns photoCard to be rendered
     */
    _createCard(card) {
        const photoCard = photoCardTemplate.querySelector(".photo-card").cloneNode(true);
    
        const photo = photoCard.querySelector('.photo-card__photo');
        const photoTitle = photoCard.querySelector(".photo-card__title");
    
        photo.src = card.link;
        photo.alt = card.name;
    
        photoTitle.textContent = card.name;
    
        const likeButton = photoCard.querySelector(".photo-card__like-button");
        addLikeEventListener(likeButton);
    
        const deleteButton = photoCard.querySelector(".photo-card__delete-button");
        addDeleteEventListener(deleteButton);
    
        addOpenPhotoEventListener(photo);
    
        return photoCard;
    
    }

    addLikeEventListener(likeButton) {
        likeButton.addEventListener("click", handleLikeEvent);
    }

    addDeleteEventListener(deleteButton) {
        deleteButton.addEventListener("click", handleDeletePhotoEvent);
    }

    addOpenPhotoEventListener(photo) {
        photo.addEventListener("click", (evt) => {
          handleOpenPhotoEvent(evt);
          openPopUp(popupPhoto);
        });
      }
    
    /**
     * Renders the card created by createCard()
     * @param {string} name - The title of the card
     * @param {string} link - The link of the photo
     */
    renderCard(card) {
        const photoCard = this._createCard(card);
        photoGrid.prepend(photoCard);
    }

}