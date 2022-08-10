export class Popup {
  constructor (popupSelector) {
this._popupSelector = popupSelector;
this.close = this.close.bind(this);
this.popup = document.querySelector(this._popupSelector);
  }

  open() {
    document.querySelector(this._popupSelector).classList.add('popup_opend')
  }
  close ()  {
    document.querySelector(this._popupSelector).classList.remove('popup_opend');
  };
  
  _closeOverlay(popup) {
    popup.classList.remove('popup_opend');
  }
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }}

  setEventListeners() {
    //закрытие нажатием на крестик
    const closeButtons = document.querySelectorAll('.popup__close-btn');
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => this.close());
    });

    //закрытие кликом на оверлей
      this.popup.addEventListener('click', (evt) => {
        this._closeOverlay(evt.target);
      });


      //закрытие нажатием на esc
      document.addEventListener('keydown', this._handleEscClose);
  }
}