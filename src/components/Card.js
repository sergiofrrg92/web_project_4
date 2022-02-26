
const popupPhoto = document.querySelector('.popup-photo');


class Card {

    constructor({ _id, name, link, likes }, cardSelector, handleCardClick, handleDeleteCardClick, handleLikeClick) {

        this._id = _id;
        this._name = name;
        this._image = link;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeClick = handleLikeClick;
    }

    getId() {
      return this._id;
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

    deleteCard() {
      this._element.remove();
      this._element = null;
    }

    updateLikes(likes, userId) {
      this._likes = likes;
      const likeButton = this._element.querySelector(".photo-card__like-button");

      this._element.querySelector(".photo-card__like-count").textContent = this._likes.length;

      if(JSON.stringify(this._likes).includes(userId)) {
        likeButton.classList.add('photo-card__like-button_active');
      } else {
        likeButton.classList.remove('photo-card__like-button_active');
      }
      
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
        const photoLikes = photoCard.querySelector(".photo-card__like-count");

        photo.src = this._image;
        photo.alt = this._name;
        photoTitle.textContent = this._name;
        photoLikes.textContent = this._likes.length;

        return photoCard;
    }

    /*
    Keeping comment for learning purposes
    declare methods as arrow functions to not lose context `this`. `this` is Card instance here
    */
    _handleLikeEvent = () => {
      const likeButton = this._element.querySelector(".photo-card__like-button");
      if(likeButton.classList.contains('photo-card__like-button_active')) {
        this._handleLikeClick(false);
      } else {
        this._handleLikeClick(true);
      }
    }

    _addLikeEventListener(likeButton) {
        likeButton.addEventListener("click", this._handleLikeEvent);
    }

    _handleDeleteEvent = () => {
      this._handleDeleteCardClick();
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
