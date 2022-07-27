import {object, FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

//создание экземпляра класса валидации
const validEditForm = new FormValidator(object, '#editForm');
const validAddForm = new FormValidator(object, '#addForm');
validEditForm.enableValidation();
validAddForm.enableValidation();

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
const buttonCloseImg = document.querySelector('.popup__close-btn_img');
const popups = document.querySelectorAll('.popup');
const buttonElement = document.querySelector('#popup_add_save');
const elementsContainer = document.querySelector('.elements');

//универсальные функции открытия и закрытия попапов
const openPopup = (popup) => {
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


//открытие попапа редактирования информации, отправка данных полей ввода
buttonEdit.addEventListener('click', function() {
  fillPopupInfoInput();
  openPopup(popupInfo);
  validEditForm.resetValidation()
});
formElementPopupInfo.addEventListener('submit', handleProfileFormSubmit);

//открытие попапа для добавления карточки
buttonAdd.addEventListener('click', function() {
  validAddForm.resetValidation()
  openPopup(popupAdd)});

//функция со слушателем для кнопок-крестиков всех попапов
const closeButtons = document.querySelectorAll('.popup__close-btn');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
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


//перебор с созданием экземпляров карточки и отрисовкой
const renderElements = () => {
initialCards.forEach(function (element) {
  const card = new Card(element.link, element.name, '.template_card', handleCardClick);
  elementsContainer.prepend(card.createCard());
})};

function handleCardClick(name, link) {
  const newPopupTitle = document.querySelector('.popup__title_img');
  const newPopupImagePic = document.querySelector('.popup__img');
  newPopupImagePic.setAttribute('src', link); 
      newPopupImagePic.setAttribute('alt', name); 
      newPopupTitle.textContent = name;
      openPopup(popupImage);
}

//добавление карточки через форму
const handleClick = (evt) => {
  evt.preventDefault();
  let cardForm = new Card(linkInput.value, titleInput.value, '.template_card', handleCardClick);
  elementsContainer.prepend(cardForm.createCard());
  evt.target.reset()
  closePopup(popupAdd);
}


popupAddForm.addEventListener('submit', handleClick);

renderElements();