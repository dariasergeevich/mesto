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

  _setEventListeners = () => {
    const newCard = this._getTemplate();

    //открытие попапа с увеличенной картинкой 
    const newCardImage =  newCard.querySelector('.element__image'); 
    newCardImage.addEventListener('click', () => { 
      this._handleCardClick(this._name, this._image);
    }); 

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