export const userSelectors = {
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__photo"
};

export const initialUserInfo = {
  newName: "Jacques Cousteau",
  newJob: "Explorer"
};

/** Declaration of the Popups */
export const popupEdit = document.querySelector('.popup-edit');
export const popupAdd = document.querySelector('.popup-add');
export const popupPhoto = document.querySelector('.popup-photo');
export const popupDelete = document.querySelector('.popup-delete')
export const popupEditAvatar = document.querySelector('.popup-edit-avatar');

/** Declaration of the Close Buttons */
export const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
export const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
export const closeButtonPhoto = popupPhoto.querySelector('.popup__close-button');
export const closeButtonDelete = popupDelete.querySelector('.popup__close-button');
export const closeButtonEditAvatar = popupEditAvatar.querySelector('.popup__close-button');

/** Declaration of the Forms */

export const formEditName = 'edit-form';
export const formAddName = 'add-form';
export const formDeleteName = 'delete-form';
export const formEditAvatarName = 'edit-avatar-form';

export const formEdit = popupEdit.querySelector('.form');
export const nameInput = formEdit.querySelector('.form__text-input[name="name"]');
export const descriptionInput = formEdit.querySelector('.form__text-input[name="about-me"]');

export const formAdd = popupAdd.querySelector('.form');
export const titleInput = formAdd.querySelector('.form__text-input[name="title"]');
export const linkInput = formAdd.querySelector('.form__text-input[name="image-link"]');

export const formEditAvatar = popupEditAvatar.querySelector('.form');
export const avatarLinkInput = formEditAvatar.querySelector('.form__text-input[name="avatar-link"]');

export const profile = document.querySelector('.profile');
export const editButton = profile.querySelector(".profile__edit-button");
export const addButton = profile.querySelector(".profile__add-button");
export const editAvatarButton = profile.querySelector(".profile__photo-edit-button");

/** Declaration of the Photos */
export const photoGridSelector = ".photos__grid";
export const photoCardTemplate = document.querySelector("#photo-card__template").content;

export const forms = new Map();

/** Declaration of the Setting object for card validation */
export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text-input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__text-input-error_active",
  errorClass: "form__input-error_visible"
};


