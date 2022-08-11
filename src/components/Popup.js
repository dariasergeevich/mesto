export class Popup {
  constructor (popupSelector) {
this._popupSelector = popupSelector;
this._close = this._close.bind(this);
this._popup = document.querySelector(this._popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opend');
    //закрытие нажатием на esc
    document.addEventListener('keydown', this._handleEscClose);
  }
  _close ()  {
    this._popup.classList.remove('popup_opend');
    document.removeEventListener('keydown', this._handleEscClose);
  };
  
  _closeOverlay(popup) {
    popup.classList.remove('popup_opend');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this._close();
    }}

  setEventListeners() {
    //закрытие нажатием на крестик
    const closeButton = this._popup.querySelector('.popup__close-btn');
      closeButton.addEventListener('click', () => this._close());

    //закрытие кликом на оверлей
      this._popup.addEventListener('click', (evt) => {
        if (evt.target == this._popup) {
        this._closeOverlay(evt.target);}
      });
  }
}