let editButton = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__info');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__description');

function popupInitial () {
    popup.classList.add ('popup_opend');
    console.log(popup.classList);
};

function popupClose () {
    popup.classList.remove ('popup_opend');
    console.log(popup.classList);
};

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы, логика отправки будет определена позже

profileName.textContent = `${nameInput.value}`;
profileInfo.textContent = `${jobInput.value}`;
}

editButton.addEventListener('click', popupInitial);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler); 
formElement.addEventListener('submit', popupClose);
