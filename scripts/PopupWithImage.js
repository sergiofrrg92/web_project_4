class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(photoImage, name) {
        const photoContainer = this._popup.querySelector('.popup-photo__container');
        const photo = photoContainer.querySelector('.popup-photo__photo');
        const title = photoContainer.querySelector('.popup-photo__title');

        photo.src = photoImage;
        title.textContent = name;
        photo.alt = name;
        super.open();
    }
}