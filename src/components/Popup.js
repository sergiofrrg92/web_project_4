class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add("popup_opened");
    }

    close() {
        this._popup.classList.remove("popup_opened");
    }

    setEventListeners() {
        document.addEventListener("click", (evt) => {
            this._handleClickOnOverlayClose(evt);
        });
        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt);
        });
        this._popup.querySelector('.popup__close-button').addEventListener("click", close);
    }

    _handleEscClose(evt) {
        if(evt.key == "Escape" && this._popup.classList.contains('popup_opened')){
            this.close();
        }
    }

    _handleClickOnOverlayClose(evt){
        if(evt.target.classList.contains("popup")){
            this.close();
        }
  }

}

export {Popup};
