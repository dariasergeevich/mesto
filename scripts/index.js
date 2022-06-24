const editButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__container');
const nameInput = document.getElementById('popupName');
const jobInput = document.getElementById('popupInfo');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
const likeButton = document.querySelectorAll('.element__like-btn');
const elementsContainer = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add-btn');
const element = document.querySelectorAll('.element');

const popupAdd = document.querySelector('#popup_add');
const popupAddCloseBtn = document.querySelector('#popup_add_close');
const titleInput = document.querySelector('#popupTitle');
const linkInput = document.querySelector('#popupLink');
const saveButton = document.querySelector('#popup_add_save');
const popupImage = document.querySelector('.popup-image');
const popupAddForm = document.querySelector('#add_container');
const deleteButton = document.querySelectorAll('.element__delete-btn');
const scaleButton = document.querySelectorAll('.element__image-btn');

function popupInitial () {
   nameInput.value = profileName.textContent;
   jobInput.value = profileInfo.textContent;
   popup.classList.add ('popup_opend');
};

function popupClose () {
    popup.classList.remove ('popup_opend');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже

profileName.textContent = `${nameInput.value}`;
profileInfo.textContent = `${jobInput.value}`;
popupClose();
}

editButton.addEventListener('click', popupInitial);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler); 

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

  //добавление в массив старых карточек
  const elementImage = document.querySelectorAll('.element__image');
  const elementTitle = document.querySelectorAll('.element__title');
      initialCards.unshift(
        {name: elementTitle[0].textContent, link: elementImage[0].src},
        {name: elementTitle[1].textContent, link: elementImage[1].src},
        {name: elementTitle[2].textContent, link: elementImage[2].src},
        {name: elementTitle[3].textContent, link: elementImage[3].src},
        {name: elementTitle[4].textContent, link: elementImage[4].src},
        {name: elementTitle[5].textContent, link: elementImage[5].src},);

//открытие и закрытие попапа для добавления карточек
function popupAddInitial() {
    popupAdd.classList.add ('popup_opend');
 };

 function popupAddClose() {
    popupAdd.classList.remove ('popup_opend');
 };

  addButton.addEventListener('click', popupAddInitial);
  popupAddCloseBtn.addEventListener('click', popupAddClose);
    

   //добавление карточек через форму
    const renderCard = (image, name) => {
    const cardTemplate = document.querySelector('#element-template').content;
    const newCard = cardTemplate.querySelector('.element').cloneNode('true');
    
    newCard.querySelector('.element__image').src = image;
    newCard.querySelector('.element__title').textContent = name;

    //функция лайка
    const newLikeButton = newCard.querySelectorAll('.element__like-btn');
    newLikeButton.forEach(b=>b.addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-btn_active');
      }));

      //удаление карточек
      const newDeleteButton = newCard.querySelectorAll('.element__delete-btn');
    newDeleteButton.forEach(b=>b.addEventListener('click', function() {
        newCard.classList.add('element_disabled');
      }));

      //открытие попапа с увеличенной картинкой
      const newScaleButton = newCard.querySelectorAll('.element__image-btn');
     newScaleButton.forEach(b=>b.addEventListener('click', function() { 
      const newPopupImagePic = document.querySelector('.popup-image__img');
newPopupImagePic.setAttribute('src',image);

const newPopupTitle = document.querySelector('.popup-image__title');
newPopupTitle.textContent = name;
       popupImage.classList.toggle('popup-image_opend');
       }));
    
    elementsContainer.prepend(newCard);
    }
    
    const handleClick = (evt) => {
    evt.preventDefault();
    renderCard(linkInput.value, titleInput.value);
    popupAddClose();
    }
    
    popupAddForm.addEventListener('submit', handleClick);

     //перебор с функцией добавления карточек из массива на страницу
  initialCards.forEach(function(element) {
    renderCard(element.link, element.name);
  });


 //реализация кнопки лайка (старые карточки)
 likeButton.forEach(b=>b.addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}));

//закрытие попапа с увеличенной картинкой
let closeButtonImg = document.querySelector('.popup-image__close-btn');
 closeButtonImg.addEventListener('click', function() { 
    popupImage.classList.toggle('popup-image_opend');
    });