import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup{
constructor(popupSelector, handleProfileFormSubmit) {
  super(popupSelector);
  this._handleProfileFormSubmit = handleProfileFormSubmit;
  this._popupSelector = popupSelector;
  this._popup = document.querySelector(popupSelector);

}
_getInputValues = () => {
const inputListValue = this._popup.querySelectorAll('.popup__input').value;
console.log (inputListValue)
return inputListValue
}

setEventListeners() {
  super.setEventListeners();
  this._popup.querySelector('.popup__form').addEventListener('submit', this._handleProfileFormSubmit);
}

close = () => {
  super.close();
  this._popup.querySelector('.popup__form').reset();
  console.log('csd')
};
}