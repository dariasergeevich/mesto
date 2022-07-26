import {openPopup} from './index.js';
//создание класса карточки 

export class Card { 
  constructor (image, name, templateSelector){ 
  this._image = image; 
  this._name = name; 
  this._templateSelector = templateSelector; 
  } 

  _getTemplate = () => { 
    const newCard = document 
    .querySelector(this._templateSelector) 
    .content 
    .querySelector('.element') 
    .cloneNode('true'); 
    return newCard;
  }

  _setEventListeners = () => {
    const newCard = this._getTemplate();
    const newCardImage =  newCard.querySelector('.element__image'); 

    //функция лайка 
    newCard.addEventListener('click', (evt) => { 
      if(evt.target.classList.contains('element__like-btn')) { 
      evt.target.classList.toggle('element__like-btn_active');
      }
    }); 

     //удаление карточек 
    const newButtonDelete = newCard.querySelector('.element__delete-btn'); 
    newButtonDelete.addEventListener('click', () => { 
    newCard.remove(); 
    }); 

    //открытие попапа с увеличенной картинкой 
  
  const newPopupImagePic = document.querySelector('.popup__img');
  const newPopupTitle = document.querySelector('.popup__title_img');
  const popupImage = document.querySelector('#popup_image');
    newCardImage.addEventListener('click', () => { 
      newPopupImagePic.setAttribute('src', this._image); 
      newPopupImagePic.setAttribute('alt', this._name); 
      newPopupTitle.textContent = this._name; 
      openPopup(popupImage); 
    }); 
return newCard;
  }; 

  createCard = () => { 
    const newCard = this._setEventListeners();
    const newCardImage =  newCard.querySelector('.element__image'); 
    newCardImage.src = this._image; 
    newCardImage.alt = this._name; 
    newCard.querySelector('.element__title').textContent = this._name;

    return newCard;
 }
} 