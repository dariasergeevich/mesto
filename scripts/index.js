const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const elementsContainer = document.querySelector('.elements');
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
const popup = document.querySelectorAll('.popup');

//универсальные функции открытия и закрытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opend');
};

function closePopup(popup) {
  popup.classList.remove('popup_opend');
};



//функция автозаполнения полей формы
function fillPopupInfoInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже

  profileName.textContent = `${nameInput.value}`;
  profileInfo.textContent = `${jobInput.value}`;
  closePopup(popupInfo);
}

//функция закрытия на enter (обработчик на всем документе)
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup(popupInfo);
    closePopup(popupAdd);
    closePopup(popupImage);
  }
}); 


//закрытие кликом на оверлей

popup.forEach(function (element) {
  element.addEventListener('click', function(evt) {
    closePopup(evt.target);
  });
});


//открытие и закрытие попапа редактирования информации, отправка данных полей ввода
buttonEdit.addEventListener('click', function() {fillPopupInfoInput(); openPopup(popupInfo)});
buttonClosePopupInfo.addEventListener('click', function() {closePopup(popupInfo)});
formElementPopupInfo.addEventListener('submit', handleProfileFormSubmit);

//открытие и закрытие попапа для добавления карточки

buttonAdd.addEventListener('click', function() {openPopup(popupAdd)});
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


//создание разметки карточки для добавления через форму или из массива
const createCard = (image, name) => {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode('true');
  const newCardImage =  newCard.querySelector('.element__image');
  newCardImage.src = image;
  newCardImage.alt = name;
  newCard.querySelector('.element__title').textContent = name;

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
  newCardImage.addEventListener('click', function () {
    newPopupImagePic.setAttribute('src', image);
    newPopupImagePic.setAttribute('alt', name);
    newPopupTitle.textContent = name;
    openPopup(popupImage);
  });

  return newCard;
};

//добавление карточки на страницу
const renderCard = (image, name) => {
  elementsContainer.prepend(createCard(image, name))
};

const handleClick = (evt) => {
  evt.preventDefault();
  renderCard(linkInput.value, titleInput.value);
  linkInput.value = '';
  titleInput.value = '';
  closePopup(popupAdd);
}

popupAddForm.addEventListener('submit', handleClick);

//перебор с функцией добавления карточек из массива на страницу
initialCards.forEach(function (element) {
  renderCard(element.link, element.name);
});


//закрытие попапа с увеличенной картинкой
buttonCloseImg.addEventListener('click', function () {
  closePopup(popupImage);
});