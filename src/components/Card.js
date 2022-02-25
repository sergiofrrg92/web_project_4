
const popupPhoto = document.querySelector('.popup-photo');


class Card {

    constructor({ name, link }, cardSelector, handleCardClick, handleDeleteCardClick) {

        this._name = name;
        this._image = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        //TODO implement delete submit and handledelete event listeners
    }

        /**
     * Creates one single photo card with specified card information (object)
     * @param {object} card
     * @returns photoCard to be rendered
     */
    createCard() {
      this._element = this._createNewPhotoCardElement();
      this._addEventListeners();

      return this._element;
    }

    _addEventListeners(){

        const likeButton = this._element.querySelector(".photo-card__like-button");
        this._addLikeEventListener(likeButton);

        const deleteButton = this._element.querySelector(".photo-card__delete-button");
        this._addDeleteEventListener(deleteButton);

        const photo = this._element.querySelector(".photo-card__photo");
        this._addOpenPhotoEventListener(photo);
    }

    _createNewPhotoCardElement() {
        const photoCard = this._cardSelector.querySelector(".photo-card").cloneNode(true);

        const photo = photoCard.querySelector(".photo-card__photo");
        const photoTitle = photoCard.querySelector(".photo-card__title");

        photo.src = this._image;
        photo.alt = this._name;
        photoTitle.textContent = this._name;

        return photoCard;
    }

    /*
    Keeping comment for learning purposes
    declare methods as arrow functions to not lose context `this`. `this` is Card instance here
    */
    _handleLikeEvent = () => {
      const likeButton = this._element.querySelector(".photo-card__like-button");
      likeButton.classList.toggle('photo-card__like-button_active');
    }

    _addLikeEventListener(likeButton) {
        likeButton.addEventListener("click", this._handleLikeEvent);
    }

    _handleDeleteEvent = () => {
      this._element.remove();
      this._element = null;
    }

    _addDeleteEventListener(deleteButton) {
        deleteButton.addEventListener("click", this._handleDeleteEvent);
    }

    _addOpenPhotoEventListener(photo) {
        photo.addEventListener("click", () => {
          this._handleCardClick();
        });
    }

}

export {Card}
