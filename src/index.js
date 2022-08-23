import './pages/index.css'
import {object, FormValidator} from '././components/FormValidator.js';
import {Card} from '././components/Card.js';
import {Section} from '././components/Section.js';
import { PopupWithImage } from '././components/PopupWithImage.js';
import { PopupWithForm } from '././components/PopupWithForm.js';
import { UserInfo } from '././components/UserInfo.js';
import {buttonEdit, buttonAdd, elementsContainer, nameInput, jobInput, profileName, profileInfo, profileImage, initialCards} from './utils/constants.js'

  //создание экземпляра класса валидации
const validEditForm = new FormValidator(object, '#editForm');
const validAddForm = new FormValidator(object, '#addForm');
validEditForm.enableValidation();
validAddForm.enableValidation();

//функция создания карточки
const createCard = (link, name, templateSelector, func) => {
  const card = new Card(link, name, templateSelector, func);
  const cardElement = card.createCard()
  return cardElement
}

//сабмит для добавления карточки
const submitCardForm = (evt) => {
  evt.preventDefault();
  const card = createCard(inputLink.value, inputTitle.value, '.template_card', handleCardClick);
  elementsContainer.prepend(card);
  popupAdd.close()
};


const popupAdd = new PopupWithForm('#popup_add', submitCardForm);
const popupInfo = new PopupWithForm('#popup_info', handleProfileFormSubmit);

popupAdd.setEventListeners();
popupInfo.setEventListeners();

const inputAddList = popupAdd.getInputValues();
const [inputTitle, inputLink] = inputAddList;

//запрос данных с сервера (личная информация) и размещение их на странице
fetch('https://nomoreparties.co/v1/cohort-49/users/me', {
  headers: {
    authorization: '94f0a02f-3d14-4f54-8e7e-5a6cac51adb8'
  }
})
  .then(res => res.json())
  .then((result) => {
    profileName.textContent = result.name;
    profileInfo.textContent = result.about;
    profileImage.src = result.avatar;
    profileImage.alt = result.name;
    ;
  })


const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});




function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже
  fetch('https://nomoreparties.co/v1/cohort-49/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '94f0a02f-3d14-4f54-8e7e-5a6cac51adb8',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then(() =>{
    setTimeout(()=>{
      location.reload()
    }), 1000
  } );
  
  //userInfo.setUserInfo(nameInput.value, jobInput.value)
  popupInfo.close();
}

//функция автозаполнения полей формы (привязана к определенной форме, для класса не пригодна)
const fillPopupInfoInput = () => {
  const data = userInfo.getUserInfo();
  const {userName, userJob} = data;
  nameInput.value = userName;
  jobInput.value = userJob;
};


//открытие попапа редактирования информации, отправка данных полей ввода
buttonEdit.addEventListener('click', function() {
 fillPopupInfoInput();
  popupInfo.open()
  validEditForm.resetValidation()
});


//открытие попапа для добавления карточки
buttonAdd.addEventListener('click', function() { 
  validAddForm.resetValidation()
  popupAdd.open()
});

//запрос карточек с сервера
const renderCards = () => { fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
  headers: {
    authorization: '94f0a02f-3d14-4f54-8e7e-5a6cac51adb8'
  }
})
  .then(res => res.json())
  .then((result) => {
      const cardList = new Section({
        items: result,
        renderer: (item) => {
          const card = createCard(item.link, item.name, '.template_card', handleCardClick);
          cardList.addItem(card);
        }
      }, '.elements')
      cardList.renderItems();
    });
}

renderCards()


const popupImage = new PopupWithImage(initialCards, '#popup_image');
popupImage.setEventListeners()

function handleCardClick() {
 popupImage.open(this._name, this._image);
}