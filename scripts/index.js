import {object, FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {Section} from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const buttonEdit = document.querySelector('.profile__edit-btn');
const buttonAdd = document.querySelector('.profile__add-btn');
const elementsContainer = document.querySelector('.elements');
const buttonElement = document.querySelector('.popup__save-btn')

  //создание экземпляра класса валидации
const validEditForm = new FormValidator(object, '#editForm');
const validAddForm = new FormValidator(object, '#addForm');
validEditForm.enableValidation();
validAddForm.enableValidation();

//сабмит для добавления карточки
const handleClick = (evt) => {
  evt.preventDefault();
  const card = new Card(inputLink.value, inputTitle.value, '.template_card', handleCardClick);
  elementsContainer.prepend(card.createCard(inputLink.value, inputTitle.value));
  popupAdd.close()
};

const popupAdd = new PopupWithForm('#popup_add', handleClick);
const popupInfo = new PopupWithForm('#popup_info', handleProfileFormSubmit);

popupAdd.setEventListeners();
popupInfo.setEventListeners();

const inputAddList = popupAdd._getInputValues();
const [inputTitle, inputLink] = inputAddList;

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});


function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже
  userInfo.setUserInfo();
  popupInfo.close();
}


//открытие попапа редактирования информации, отправка данных полей ввода
buttonEdit.addEventListener('click', function() {
 // fillPopupInfoInput();
 userInfo.fillPopupInfoInput();
  popupInfo.open()
  validEditForm.resetValidation()
});


//открытие попапа для добавления карточки
buttonAdd.addEventListener('click', function() { 
  buttonElement.classList.add('popup__save-btn_disabled'); 
  buttonElement.setAttribute('disabled', '');
  validAddForm.resetValidation()
  popupAdd.open()
});


//массив с новыми карточками

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.link, item.name, '.template_card', handleCardClick);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.renderItems();

const popupImage = new PopupWithImage(initialCards, '#popup_image');
popupImage.setEventListeners()

function handleCardClick() {
 popupImage.open(this._name, this._image);
}
