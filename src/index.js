import './pages/index.css'
import {object, FormValidator} from '././components/FormValidator.js';
import {Card} from '././components/Card.js';
import {Section} from '././components/Section.js';
import { PopupWithImage } from '././components/PopupWithImage.js';
import { PopupWithForm } from '././components/PopupWithForm.js';
import { UserInfo } from '././components/UserInfo.js';
import {buttonEdit, buttonAdd, elementsContainer, nameInput, jobInput, profileName, profileInfo, initialCards} from './utils/constants.js'

  //создание экземпляра класса валидации
const validEditForm = new FormValidator(object, '#editForm');
const validAddForm = new FormValidator(object, '#addForm');
validEditForm.enableValidation();
validAddForm.enableValidation();

//функция создания карточки
const createCard = (link, name, templateSelector, func) => {
  const card = new Card(link, name, templateSelector, func);
  return card
}

//сабмит для добавления карточки
const submitCardForm = (evt) => {
  evt.preventDefault();
  const card = createCard(inputLink.value, inputTitle.value, '.template_card', handleCardClick);
  elementsContainer.prepend(card.createCard(inputLink.value, inputTitle.value));
  popupAdd.close()
};


const popupAdd = new PopupWithForm('#popup_add', submitCardForm);
const popupInfo = new PopupWithForm('#popup_info', handleProfileFormSubmit);

popupAdd.setEventListeners();
popupInfo.setEventListeners();

const inputAddList = popupAdd.getInputValues();
const [inputTitle, inputLink] = inputAddList;

const userInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__description'});


function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже
  const data = userInfo.getUserInfo();
  const {name, info} = data;
  userInfo.setUserInfo(name, info)
  popupInfo.close();
}

//функция автозаполнения полей формы (привязана к определенной форме, для класса не пригодна)
const fillPopupInfoInput = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
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


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.link, item.name, '.template_card', handleCardClick);
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
