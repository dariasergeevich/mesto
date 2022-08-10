
export class UserInfo{
constructor({nameSelector, infoSelector}) {
this._nameSelector = nameSelector;
this._infoSelector = infoSelector;
this.setUserInfo = this.setUserInfo.bind(this);
this.fillPopupInfoInput = this.fillPopupInfoInput.bind(this);
}
getUserInfo() {
  const nameValue = document.querySelector('#popupName').value;
  const infoValue = document.querySelector('#popupInfo').value;
  return {nameValue, infoValue}
}
setUserInfo = () => {
  const data = this.getUserInfo();
  const {nameValue, infoValue} = data;
  const name = document.querySelector(this._nameSelector);
  const info = document.querySelector(this._infoSelector);
 name.textContent = nameValue;
info.textContent = infoValue;
return {name, info}

}
//функция автозаполнения полей формы
fillPopupInfoInput () {
  const nameInput = document.getElementById('popupName');
const jobInput = document.getElementById('popupInfo');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}
}