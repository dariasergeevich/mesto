const buttonEdit = document.querySelector('.profile__edit-btn');
const popupInfo = document.querySelector('#popup_info');
const buttonClosePopupInfo = document.querySelector('#popup_info_close');
const formElementPopupInfo = document.querySelector('#info_container');
const nameInput = document.getElementById('popupName');
const jobInput = document.getElementById('popupInfo');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const elementsContainer = document.querySelector('.elements');
const buttonAdd = document.querySelector('.profile__add-btn');
const element = document.querySelectorAll('.element');
const popupAdd = document.querySelector('#popup_add');
const popupAddCloseBtn = document.querySelector('#popup_add_close');
const titleInput = document.querySelector('#popupTitle');
const linkInput = document.querySelector('#popupLink');
const popupImage = document.querySelector('#popup_image');
const popupAddForm = document.querySelector('#add_container');
const cardTemplate = document.querySelector('#element-template');
const newPopupImagePic = document.querySelector('.popup__img');

//универсальные функции открытия и закрытия попапов
function openPopup (popup) {
  popup.classList.add('popup_opend')
};

function closePopup(popup) {
  popup.classList.remove('popup_opend');
};

//функция передачи данных из формы
function popupInfoForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже

  profileName.textContent = `${nameInput.value}`;
  profileInfo.textContent = `${jobInput.value}`;
  popupInfoForm();
  closePopup(popupInfo);
}


//открытие и закрытие попапа редактирования информации, отправка данных полей ввода
buttonEdit.addEventListener('click', function() {openPopup(popupInfo)});
buttonClosePopupInfo.addEventListener('click', function() {closePopup(popupInfo)});
formElementPopupInfo.addEventListener('submit', formSubmitHandler);

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


//добавление карточек через форму
const renderCard = (image, name) => {
  const newCard = cardTemplate.content.querySelector('.element').cloneNode('true');
  newCard.querySelector('.element__image').src = image;
  newCard.querySelector('.element__image').alt = name;
  newCard.querySelector('.element__title').textContent = name;

  //функция лайка
  const newLikeButton = newCard.querySelector('.element__like-btn');
  newLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });

  //удаление карточек
  const newDeleteButton = newCard.querySelector('.element__delete-btn');
  newDeleteButton.addEventListener('click', function () {
    newCard.classList.add('element_disabled');
  });

  //открытие попапа с увеличенной картинкой
  const newScaleButton = newCard.querySelectorAll('.element__image-btn');
  newScaleButton.forEach(b => b.addEventListener('click', function () {
    newPopupImagePic.setAttribute('src', image);
    newPopupImagePic.setAttribute('alt', name);
    const newPopupTitle = document.querySelector('.popup__title_img');
    newPopupTitle.textContent = name;
    openPopup(popupImage);
  }));

  return elementsContainer.prepend(newCard);
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
const closeButtonImg = document.querySelector('.popup__close-btn_img');
closeButtonImg.addEventListener('click', function () {
  closePopup(popupImage);
});