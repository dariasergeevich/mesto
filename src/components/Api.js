
export class Api {
  constructor() { 
    this._headers = {
      authorization: '4ab3b9ac-2c40-42c4-a935-6137f5f2d4e1',
      'Content-Type': 'application/json'
    };
    this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-51';

  }

  getInitialCards() {
   return (fetch(`${this._baseUrl}/cards`, {
 headers: this._headers
})
  )
  }

  addCard (name, link) {
    return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: name.value,
      link: link.value
    })
  })
  }

getUserInfo() {
 return fetch(`${this._baseUrl}/users/me`, {
  headers: this._headers
})
}

  changeUserInfo (name, about) {
   return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: name.value,
      about: about.value
    })
  })
  }
  changeAvatar (input) {
   return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: input.value,
    })
  })
  }

  putLike (card) {
    return fetch(`${this._baseUrl}/cards/${card.id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        likes: '1'
      })
      })
  }

getCardInfo(card) {
  return fetch(`${this._baseUrl}/cards/${card.id}/likes`, {
    headers: this._headers,
    })
}

  deleteLike (card) {
return fetch(`${this._baseUrl}/cards/${card.id}/likes`, {
  method: 'DELETE',
  headers: this._headers,
  })
  }

  deleteCard (card) {
   return fetch(`${this._baseUrl}/cards/${card.id}`, {
      method: 'DELETE',
      headers: this._headers
      })
  }
}