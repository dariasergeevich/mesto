export const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export class FormValidator {
  constructor(object) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
  }
    _showInputError = (formElement, inputElement, errorMessage) => { //параметры - форма, поле формы, сообщение ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //элемент ошибки в зависимости от поля ввода (селектор вида <span class="form__input-error email-input-error"></span> или <span class="form__input-error password-input-error"></span>)
    inputElement.classList.add(this._inputErrorClass); //добавляем полю ввода селектор ошибки (который добавляет красную линию, например)
    errorElement.textContent = errorMessage; //добавляем в элемент span текст ошибки
    errorElement.classList.add(this._errorClass); //меняем у span display на block
  };

  _hideInputError = (formElement, inputElement) => { //параметры - форма, поле формы
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ''; //убираем текст ошибки
  };

  _checkInputValidity = (formElement, inputElement) => { //параметры - форма, поле формы
    if (!inputElement.validity.valid) { //если форма не валидна
      this._showInputError(formElement, inputElement, inputElement.validationMessage); //запустить функцию показа ошибки
    } else {
      this._hideInputError(formElement, inputElement); //скрыть функцию показа ошибки
    }
  };

  _hasInvalidInput = (inputList, inputElement) => { 
    return inputList.some((inputElement) => { //перебор массива всех полей ввода (есть ли хотя бы один эл-т, который соответсвует условию ниже)
      return !inputElement.validity.valid; //условия - хотя бы одно поле не валидно, тогда вернет true
    });
  };
  _toggleButtonState = (inputList, buttonElement) => {
    console.log(this._hasInvalidInput(inputList));
    if (this._hasInvalidInput(inputList)) { //если true (есть хоть один невалидный инпут)
      buttonElement.classList.add(this._inactiveButtonClass); //то сделать кнопку неактивной
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled'); //иначе кнопка активна, нет модификатора неактивности (что прописать в css?)
    }
  };
  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector('.popup__save-btn'); //кнопка отправки формы
    this._toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formSelector)); 
  
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    }
    );
  
      this._setEventListeners(formElement);
  }); 
  }
}