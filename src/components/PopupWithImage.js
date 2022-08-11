import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup{
constructor(items, popupSelector) {
  super(popupSelector);
  this._link = items.link;
  this._title = items.name;
  this._popupImage = document.querySelector('.popup__img');
  this._popupTitle = document.querySelector('.popup__title_img');
  this.open = this.open.bind(this);
  this._popup = document.querySelector(this._popupSelector);
}
open = (name, image) => {
  this._popupImage.src = image;
  this._popupImage.setAttribute('alt', name);
  this._popupTitle.textContent = name;
  super.open()
}
}
