let editButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__container');
let nameInput = document.getElementById('popupName');
let jobInput = document.getElementById('popupInfo');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__description');

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
