class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add("popup_opened");
    }

    close() {
        popup.classList.remove("popup_opened");
    }

    setEventListeners() {
        document.addEventListener("click", this._handleClickOnOverlayClose);
        document.addEventListener("keydown", this._handleEscClose);
    }

    removeEventListeners() {
        document.removeEventListener("click", this._handleClickOnOverlayClose);
        document.removeEventListener("keydown", this._handleEscClose);
    }
    
    _handleEscClose(evt) {
        if(evt.key == "Escape" && this._popup.classList.contains('.popup_opened')){
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