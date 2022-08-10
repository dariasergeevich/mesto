
export class UserInfo{
constructor({nameSelector, infoSelector}) {
this._nameSelector = nameSelector;
this._infoSelector = infoSelector;
this.setUserInfo = this.setUserInfo.bind(this);
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
}
}