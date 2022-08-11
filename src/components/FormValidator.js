export const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export class FormValidator {
  constructor(object, formId) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._formId = formId;
    this._formElement = document.querySelector(this._formId);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector('.popup__save-btn');
  }
    _showInputError = (inputElement, errorMessage) => { //параметры - форма, поле формы, сообщение ошибки
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); //элемент ошибки в зависимости от поля ввода (селектор вида <span class="form__input-error email-input-error"></span> или <span class="form__input-error password-input-error"></span>)
    inputElement.classList.add(this._inputErrorClass); //добавляем полю ввода селектор ошибки (который добавляет красную линию, например)
    errorElement.textContent = errorMessage; //добавляем в элемент span текст ошибки
    errorElement.classList.add(this._errorClass); //меняем у span display на block
  };

  _hideInputError = (inputElement) => { //параметры - форма, поле формы
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ''; //убираем текст ошибки
  };

  _checkInputValidity = (inputElement) => { //параметры - форма, поле формы
    if (!inputElement.validity.valid) { //если форма не валидна
      this._showInputError(inputElement, inputElement.validationMessage); //запустить функцию показа ошибки
    } else {
      this._hideInputError(inputElement); //скрыть функцию показа ошибки
    }
  };

  _hasInvalidInput = (inputElement) => { 
    return this._inputList.some((inputElement) => { //перебор массива всех полей ввода (есть ли хотя бы один эл-т, который соответсвует условию ниже)
      return !inputElement.validity.valid; //условия - хотя бы одно поле не валидно, тогда вернет true
    });
  };
  _toggleButtonState = () => {
    console.log(this._hasInvalidInput());
    if (this._hasInvalidInput()) { //если true (есть хоть один невалидный инпут)
      this._buttonElement.classList.add(this._inactiveButtonClass); //то сделать кнопку неактивной
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled'); //иначе кнопка активна, нет модификатора неактивности (что прописать в css?)
    }
  };

  _setEventListeners = () => {
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
//очистка сообщений об ошибке
resetValidation() {
  this._toggleButtonState(); 
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
}


  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    }
    );
  
      this._setEventListeners(this._formElement);
  }
}