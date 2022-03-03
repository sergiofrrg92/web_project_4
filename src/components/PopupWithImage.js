import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._photo = this._popup.querySelector('.popup-photo__photo');
        this._title = this._popup.querySelector('.popup-photo__title');
    }

    open(photoImage, name) {
        this._photo.src = photoImage;
        this._title.textContent = name;
        this._photo.alt = name;
        super.open();
    }
}

export { PopupWithImage };
