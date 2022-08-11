export class Card { 
  constructor (image, name, templateSelector, handleCardClick){ 
  this._image = image; 
  this._name = name; 
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

     //удаление карточек
    const newButtonDelete = newCard.querySelector('.element__delete-btn'); 
    newButtonDelete.addEventListener('click', this.delete); 
  
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