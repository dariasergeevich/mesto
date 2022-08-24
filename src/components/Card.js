import { Popup } from "./Popup.js";
export class Card { 
  constructor (image, name, like, templateSelector, handleCardClick){ 
  this._image = image; 
  this._name = name; 
  this._like = like;
  this._templateSelector = templateSelector;
  this._handleCardClick = handleCardClick;
  } 

  _getTemplate = () => { 
    const newCard = document 
    .querySelector(this._templateSelector) 
    .content 
    .querySelector('.element') 
    .cloneNode('true'); 
    return newCard;
  }

  //функция лайка 
  like = (evt) => {
    if(evt.target.classList.contains('element__like-btn')) { 
      evt.target.classList.toggle('element__like-btn_active');

/*if(evt.target.classList.contains('element__like-btn_active')) { //если кнопка лайка активна

fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', { //найти способ дополнить массив на сервере
    method: 'PATCH',
    headers: {
      authorization: '94f0a02f-3d14-4f54-8e7e-5a6cac51adb8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: [1]
    })
  })
}*/
      }
      
  }

  delete = () => {
    this._element.remove();
  }

  _setEventListeners = () => {
    this._element = this._getTemplate();
    const newCard = this._element;

    //открытие попапа с увеличенной картинкой 
    const newCardImage =  newCard.querySelector('.element__image'); 
    newCardImage.addEventListener('click', () => { 
    this._handleCardClick();
    }); 

    //функция лайка 
    newCard.addEventListener('click', this.like); 

    //отображение значка корзины
  fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
  headers: {
    authorization: '94f0a02f-3d14-4f54-8e7e-5a6cac51adb8'
  }
})
  .then(res => res.json())
  .then((result) => {
    result.forEach((item)=>{
      console.log(item)
      if (!item.owner.name === 'Jacques Cousteau') {
        newButtonDelete.classList.add('element__delete-btn_hidden')
      }
    });
  });

   //удаление карточек
   const newButtonDelete = newCard.querySelector('.element__delete-btn');
   const popupDelete = new Popup('.popup_delete');
   newButtonDelete.addEventListener('click', () => popupDelete.open()); 
   popupDelete.setEventListeners();

   
  
return newCard;
  }; 

  createCard = () => { 
    const newCard = this._setEventListeners();
    const newCardImage =  newCard.querySelector('.element__image');
    const newCardLike =  newCard.querySelector('.element__likes-count');
    newCardImage.src = this._image; 
    newCardImage.alt = this._name; 
    newCardLike.textContent = this._like;
    if(newCardLike.textContent == 0) {
      newCardLike.textContent = ''
    }
    newCard.querySelector('.element__title').textContent = this._name;

    return newCard;
 }
} 