
export class UserInfo{
constructor({nameSelector, infoSelector}) {
this._nameSelector = nameSelector;
this._infoSelector = infoSelector;
this._userName = document.querySelector(this._nameSelector);
this._userJob = document.querySelector(this._infoSelector);
this.setUserInfo = this.setUserInfo.bind(this);
}
getUserInfo() {
  return {
    userName: this._userName.textContent,
    userJob: this._userJob.textContent
  }
}
setUserInfo = (name, job) => {
  this._userName.textContent = name;
  this._userJob.textContent = job;

}

}