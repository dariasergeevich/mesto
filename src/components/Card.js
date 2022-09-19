import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Api } from "./Api.js";
export class Card { 
  constructor (id, owner, image, name, like, templateSelector){ 
  this._image = image; 
  this._name = name; 
  this._like = like;
  this._templateSelector = templateSelector;
  this._id = id;
  this._owner = owner;
  } 

  _getTemplate = () => { 
    const newCard = document 
    .querySelector(this._templateSelector) 
    .content 
    .querySelector('.element') 
    .cloneNode('true'); 
    return newCard;
  }

  delete = () => {
    this._element.remove();
  }

  //постановка лайка (добавление в массив)
   putLike = (card) => {
      const api = new Api;
      api.putLike(card)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      });

    const likeButton = card.querySelector('.element__like-btn')
    likeButton.classList.add('element__like-btn_active')
  }

  /*likeCheck = (card) => {
    const api = new Api;
    api.getCardInfo(card)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => {if (res._id === 'dfafee16dcd4a54bbbf83cea')
  {
    const likeButton = card.querySelector('.element__like-btn')
    likeButton.classList.add('.element__like-btn_active')
  }})
  }*/
  
  //удаление лайка (удаление из массива)
  deleteLike = (card) => {
      const api = new Api;
      api.deleteLike(card)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      })
      
    const likeButton = card.querySelector('.element__like-btn')
    likeButton.classList.remove('element__like-btn_active')
  }

   //показать значок корзины
   showDeleteIcon = () => {
    this._element = this._getTemplate();
    const newCard = this._element;
  const newButtonDelete = newCard.querySelector('.element__delete-btn');
console.log(newCard)
  const api = new Api;
  api.getInitialCards()
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    res.forEach(card => {
      if (!card.owner._id === 'dfafee16dcd4a54bbbf83cea') {
        newButtonDelete.classList.add('element__delete-btn_hidden')
      }
    });
  })
  .catch((err) => {
    console.log(err)
  })
  }


  //подтверждение удаления
  deleteConfirm = (card) => {
    const confirmButton = document.querySelector('.popup__save-btn_delete');
    const popupDelete = new Popup('.popup_delete');
  confirmButton.addEventListener('click', () => {
      const api = new Api;
      api.deleteCard(card)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err)
      });

      this.delete()
      popupDelete._close()
  })
  }


  _setEventListeners = () => {
    this._element = this._getTemplate();
    const newCard = this._element;
    this.showDeleteIcon()
    //открытие попапа с увеличенной картинкой 
    const newCardImage =  newCard.querySelector('.element__image'); 
    newCardImage.addEventListener('click', () => {
const api = new Api;
api.getInitialCards()
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
.then(res => {
  const popupImage = new PopupWithImage(res, '#popup_image');
popupImage.setEventListeners();
popupImage.open(this._name, this._image)
    })
    .catch((err) => {
      console.log(err)
    });
  }); 

    //функция лайка 
    newCard.addEventListener('click', () => {
     this.putLike(newCard);
     this.deleteLike(newCard);
    }
    ); 

//удаление карточек
   const popupDelete = new Popup('.popup_delete');
   const newButtonDelete = newCard.querySelector('.element__delete-btn')
   newButtonDelete.addEventListener('click', () => {
    popupDelete.open();
    this.deleteConfirm(newCard);
  });

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
    newCard.id = this._id;
    newCard.setAttribute('owner', this._owner);

    return newCard;
 }
} 