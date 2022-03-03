class Card {

    constructor({ _id, name, link, likes, owner }, currentUserId, cardSelector, handleCardClick, handleDeleteCardClick, handleLikeClick) {

        this._id = _id;
        this._currentUserId = currentUserId;
        this._name = name;
        this._image = link;
        this._likes = likes;
        this._owner = owner;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeClick = handleLikeClick;
    }

    getId() {
      return this._id;
    }

    getName() {
      return this._name;
    }

    getImageLink() {
      return this._image;
    }

    /**
     * Creates one single photo card with specified card information (object)
     * @param {object} card
     * @returns photoCard to be rendered
     */
    createCard() {
      this._element = this._createNewPhotoCardElement();
      this._likeCountElement = this._element.querySelector(".photo-card__like-count");
      this._likeButton = this._element.querySelector(".photo-card__like-button");
      this._deleteButton = this._element.querySelector(".photo-card__delete-button");
      this._photo = this._element.querySelector(".photo-card__photo");
      this.updateLikes(this._likes, this._currentUserId);
      if(this._owner._id != this._currentUserId) {
        this._deleteButton.remove();
        this._deleteButton = null;
      }

      this._addEventListeners();

      return this._element;
    }

    deleteCard() {
      this._element.remove();
      this._element = null;
    }

    updateLikes(likes, userId) {
      this._likes = likes;

      this._likeCountElement.textContent = this._likes.length;

      if(JSON.stringify(this._likes).includes(userId)) {
        this._likeButton.classList.add('photo-card__like-button_active');
      } else {
        this._likeButton.classList.remove('photo-card__like-button_active');
      }

    }

    _addEventListeners(){

        this._addLikeEventListener();
        this._addOpenPhotoEventListener();
        if(this._deleteButton) {
          this._addDeleteEventListener();
        }
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
      if(this._likeButton.classList.contains('photo-card__like-button_active')) {
        this._handleLikeClick(this, false);
      } else {
        this._handleLikeClick(this, true);
      }
    }

    _addLikeEventListener() {
      this._likeButton.addEventListener("click", this._handleLikeEvent);
    }

    _handleDeleteEvent = () => {
      this._handleDeleteCardClick(this);
    }

    _addDeleteEventListener() {
        this._deleteButton.addEventListener("click", this._handleDeleteEvent);
    }

    _addOpenPhotoEventListener() {
        this._photo.addEventListener("click", () => {
          this._handleCardClick(this);
        });
    }

}

export {Card}
