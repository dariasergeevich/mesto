import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
constructor(popupSelector, handleProfileFormSubmit) {
  super(popupSelector);
  this._handleProfileFormSubmit = handleProfileFormSubmit;
  this._popupSelector = popupSelector;
  this._popup = document.querySelector(popupSelector);

}
_getInputValues = () => {
const inputList = this._popup.querySelectorAll('.popup__input');
return inputList
}

setEventListeners() {
  super.setEventListeners();
  this._popup.querySelector('.popup__form').addEventListener('submit', this._handleProfileFormSubmit);
}

close = () => {
  super.close();
  this._popup.querySelector('.popup__form').reset();
};
}