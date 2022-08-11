
export class UserInfo{
constructor({nameSelector, infoSelector}) {
this._nameSelector = nameSelector;
this._infoSelector = infoSelector;
this.setUserInfo = this.setUserInfo.bind(this);
}
getUserInfo() {
  const name  = document.querySelector(this._nameSelector);
  const info = document.querySelector(this._infoSelector);
  return {name, info}
}
setUserInfo = () => {
  const data = this.getUserInfo();
  const {name, info} = data;
  const nameValue = document.querySelector('#popupName').value;
  const infoValue = document.querySelector('#popupInfo').value;
 name.textContent = nameValue;
info.textContent = infoValue;

}
}