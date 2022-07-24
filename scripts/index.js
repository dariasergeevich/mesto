import {object, FormValidator} from './FormValidator.js';
import {Card, elementsContainer} from './Card.js';

//создание экземпляра класса валидации
let valid = new FormValidator(object);
valid.enableValidation();

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const element = document.querySelectorAll('.element');
const popupInfo = document.querySelector('#popup_info');
const formElementPopupInfo = document.querySelector('#info_container');
const buttonEdit = document.querySelector('.profile__edit-btn');
const nameInput = document.getElementById('popupName');
const jobInput = document.getElementById('popupInfo');
const buttonClosePopupInfo = document.querySelector('#popup_info_close');
const buttonAdd = document.querySelector('.profile__add-btn');
const popupAdd = document.querySelector('#popup_add');
const popupAddCloseBtn = document.querySelector('#popup_add_close');
const titleInput = document.querySelector('#popupTitle');
const linkInput = document.querySelector('#popupLink');
const popupImage = document.querySelector('#popup_image');
const popupAddForm = document.querySelector('#add_container');
const cardTemplate = document.querySelector('#element-template');
const newPopupImagePic = document.querySelector('.popup__img');
const newPopupTitle = document.querySelector('.popup__title_img');
const buttonCloseImg = document.querySelector('.popup__close-btn_img');
const popups = document.querySelectorAll('.popup');
const buttonElement = document.querySelector('#popup_add_save');

//универсальные функции открытия и закрытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opend');
  document.addEventListener('keydown', closePopupEsc);
};


function closePopup(popup) {
  popup.classList.remove('popup_opend');
  document.removeEventListener('keydown', closePopupEsc);
};

//функция закрытия попапа на esc
function closePopupEsc (evt, popup) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opend');
    closePopup(popup);
  }
};

//функция автозаполнения полей формы
function fillPopupInfoInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже

  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup(popupInfo);
}


//закрытие кликом на оверлей

popups.forEach(function (element) {
  element.addEventListener('click', function(evt) {
    closePopup(evt.target);
  });
});


//открытие и закрытие попапа редактирования информации, отправка данных полей ввода
buttonEdit.addEventListener('click', function() {fillPopupInfoInput(); openPopup(popupInfo)});
buttonClosePopupInfo.addEventListener('click', function() {closePopup(popupInfo)});
formElementPopupInfo.addEventListener('submit', handleProfileFormSubmit);

//открытие и закрытие попапа для добавления карточки

buttonAdd.addEventListener('click', function() {
  buttonElement.classList.add('popup__save-btn_disabled');
  buttonElement.setAttribute('disabled', '');
  openPopup(popupAdd)});

popupAddCloseBtn.addEventListener('click', function() {closePopup(popupAdd)});

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
  

//перебор с созданием экземпляров карточки и отрисовкой
initialCards.forEach(function (element) {
  let card = new Card(element.link, element.name, '.template_card');
  card.renderCard();
});

//добавление карточки через форму
const handleClick = (evt) => {
  evt.preventDefault();
  let cardForm = new Card(linkInput.value, titleInput.value, '.template_card');
  cardForm.renderCard();
  linkInput.value = '';
  titleInput.value = '';
  closePopup(popupAdd);
}
popupAddForm.addEventListener('submit', handleClick);

//закрытие попапа с увеличенной картинкой
buttonCloseImg.addEventListener('click', function () {
  closePopup(popupImage);
});