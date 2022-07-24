export const elementsContainer = document.querySelector('.elements');
//создание класса карточки
export class Card {
  constructor (image, name, templateSelector){
  this._image = image;
  this._name = name;
  this._templateSelector = templateSelector;
  }

  createCard = () => {
    const newCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode('true');

    const newCardImage =  newCard.querySelector('.element__image');
    newCardImage.src = this._image;
    newCardImage.alt = this._name;
    newCard.querySelector('.element__title').textContent = this._name;

  
    //функция лайка
    newCard.addEventListener('click', function (evt) {
      if(evt.target.classList.contains('element__like-btn')) {
      evt.target.classList.toggle('element__like-btn_active');
      }
    });
  
     //удаление карточек
    const newButtonDelete = newCard.querySelector('.element__delete-btn');
    newButtonDelete.addEventListener('click', function () {
      newCard.remove();
    });
  
    //открытие попапа с увеличенной картинкой
    newCardImage.addEventListener('click', () => {
      newPopupImagePic.setAttribute('src', this._image);
      newPopupImagePic.setAttribute('alt', this._name);
      newPopupTitle.textContent = this._name;
      openPopup(popupImage);
  
    });

    return newCard;
  };
  renderCard = () => {
    elementsContainer.prepend(this.createCard());

  };
}