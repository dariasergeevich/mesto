//универсальная функция показа текста ошибки при неправильном заполнении поля ввода
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => { //параметры - форма, поле формы, сообщение ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //элемент ошибки в зависимости от поля ввода (селектор вида <span class="form__input-error email-input-error"></span> или <span class="form__input-error password-input-error"></span>)
  inputElement.classList.add(inputErrorClass); //добавляем полю ввода селектор ошибки (который добавляет красную линию, например)
  errorElement.textContent = errorMessage; //добавляем в элемент span текст ошибки
  errorElement.classList.add(errorClass); //меняем у span display на block
};


//универсальная функция скрытия ошибки
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => { //параметры - форма, поле формы
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ''; //убираем текст ошибки
};


//функция проверки валидности формы
const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => { //параметры - форма, поле формы
  if (!inputElement.validity.valid) { //если форма не валидна
    showInputError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass}); //запустить функцию показа ошибки
  } else {
    hideInputError(formElement, inputElement, {inputErrorClass, errorClass}); //скрыть функцию показа ошибки
  }
};


//функция проверки валидности форм всей страницы, в параметре массив полей ввода
const hasInvalidInput = (inputList, inputElement) => { 
  return inputList.some((inputElement) => { //перебор массива всех полей ввода (есть ли хотя бы один эл-т, который соответсвует условию ниже)
    return !inputElement.validity.valid; //условия - хотя бы одно поле не валидно, тогда вернет true
  });
};

//изменение состояния кнопки, зависящей от полей ввода (параметры - массив полей и кнопка)
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) { //если true (есть хоть один невалидный инпут)
    buttonElement.classList.add(inactiveButtonClass); //то сделать кнопку неактивной
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled'); //иначе кнопка активна, нет модификатора неактивности (что прописать в css?)
  }
};

//назначение слушателей всем полям ввода
const setEventListeners = (formElement, {inputSelector, inputErrorClass, errorClass, inactiveButtonClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector('.popup__save-btn'); //кнопка отправки формы
  toggleButtonState(inputList, buttonElement, {inactiveButtonClass});

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
      toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
    });
  });
};


//Деструктуризация с последующим использованием переменных как параметров
const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


//перебор всех форм на странице и активизация функций
  const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); 

  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector('.popup__save-btn');
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass});
  }
  );

    setEventListeners(formElement, {inputSelector, inputErrorClass, errorClass, inactiveButtonClass});
}); 
}
enableValidation(object);
