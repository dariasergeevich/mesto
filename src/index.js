import './pages/index.css'
import {object, FormValidator} from '././components/FormValidator.js';
import {Card} from '././components/Card.js';
import {Section} from '././components/Section.js';
import { PopupWithForm } from '././components/PopupWithForm.js';
import { UserInfo } from '././components/UserInfo.js';
import {buttonEdit, buttonAdd, nameInput, jobInput, profileName, profileInfo, profileImage} from './utils/constants.js'
import { Api } from './components/Api';
  //создание экземпляра класса валидации
const validEditForm = new FormValidator(object, '#editForm');
const validAddForm = new FormValidator(object, '#addForm');
const validAvatarForm = new FormValidator(object, '#avatarForm');

validEditForm.enableValidation();
validAddForm.enableValidation();
validAvatarForm.enableValidation();

//функция создания карточки
const createCard = (id, owner, link, name, templateSelector, func) => {
  const card = new Card(id, owner, link, name, templateSelector, func);
  const cardElement = card.createCard()
  return cardElement
}

//функция показа надписи "данные загружаются"
function loadingData(isLoading, button) {
  if (isLoading) {
button.textContent = 'Сохранение...'
  }
}

//сабмит для добавления карточки
const submitCardForm = (evt) => {
  evt.preventDefault();
  const buttonCard = document.querySelector('#popup_add_save')
  loadingData(true, buttonCard);
  const api = new Api;
  api.addCard (inputTitle, inputLink)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(() =>{
    setTimeout(()=>{
      location.reload()
    }), 1000
  } )
  .catch((err) => {
    console.log(err)
  });
  popupAdd.close()
};



const popupAdd = new PopupWithForm('#popup_add', submitCardForm);
const popupInfo = new PopupWithForm('#popup_info', handleProfileFormSubmit);

popupAdd.setEventListeners();
popupInfo.setEventListeners();

const inputAddList = popupAdd.getInputValues();
const [inputTitle, inputLink] = inputAddList;

//запрос данных с сервера (личная информация) и размещение их на странице
const api = new Api;
api.getUserInfo()
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
  .then((result) => {
    profileName.textContent = result.name;
    profileInfo.textContent = result.about;
    profileImage.src = result.avatar;
    profileImage.alt = result.name;
    ;
  })
  .catch((err) => {
    console.log(err)
  });


const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});

//создание экземпляра класса попапа для изменения аватара
const popupAvatar = new PopupWithForm('#popup_avatar', submitAvatar)
popupAvatar.setEventListeners()

//открытие попапа
const avatar = document.querySelector('.profile__background');
avatar.addEventListener('click', () => {popupAvatar.open()})

//функция добавления данных об аватаре на сервер
const avatarInput = document.querySelector('#popupAvatar')

function submitAvatar(evt) {
  evt.preventDefault();
  const buttonAvatar = document.querySelector('.popup__save-btn_avatar')
  loadingData(true, buttonAvatar);
  const api = new Api;
  api.changeAvatar (avatarInput)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(() =>{
    setTimeout(()=>{
      location.reload()
    }), 1000
  } )
  .catch((err) => {
    console.log(err)
  });
  
  popupAvatar.close();
  
}

//изменение данных пользователя
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const buttonInfo = document.querySelector('.popup__save-btn_info')
  loadingData(true, buttonInfo);
  const api = new Api();
  api.changeUserInfo (nameInput, jobInput)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(() =>{
    setTimeout(()=>{
      location.reload()
    }), 1000
  } )
  .catch((err) => {
    console.log(err)
  });
  
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
const renderCards = () => { 
const api = new Api();
api.getInitialCards()
.then(res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
})
  .then((result) => {
      const cardList = new Section({
        items: result,
        renderer: (item) => {
    
          const card = createCard(item._id, item.owner._id, item.link, item.name, item.likes.length, '.template_card');
          cardList.addItem(card);
        }
      }, '.elements')
      cardList.renderItems();
    })
    .catch((err) => {
      console.log(err)
    });
    
}

renderCards()

