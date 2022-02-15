class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
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
        document.addEventListener("click", (evt) => {
            this._handleClickOnOverlayClose(evt);
        });
        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt);
        });
    }

    removeEventListeners() {
        document.removeEventListener("click", this._handleClickOnOverlayClose);
        document.removeEventListener("keydown", this._handleEscClose);
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