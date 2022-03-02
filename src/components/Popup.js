class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this.close = this.close.bind(this); //Better bind than defining close as an arrow function I guess?
    }

    open() {
        this._popup.classList.add("popup_opened");
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove("popup_opened");
        this.removeEventListeners();
    }

    setEventListeners() {
      document.addEventListener("click", this._handleClickOnOverlayClose);
      document.addEventListener("keydown", this._handleEscClose);
      this._closeButton.addEventListener("click", this.close);
    }

    removeEventListeners() {
      document.removeEventListener("click", this._handleClickOnOverlayClose);
      document.removeEventListener("keydown", this._handleEscClose);
      this._closeButton.removeEventListener("click", close);
    }

    _handleEscClose = (evt) => {
        if(evt.key == "Escape"){
            this.close();
        }
    }

    _handleClickOnOverlayClose = (evt) => {
        if(evt.target.classList.contains("popup")){
            this.close();
        }
  }

}

export {Popup};
