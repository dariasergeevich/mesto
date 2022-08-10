export class Section {
  constructor({ items, renderer }, containerSelector) { //renderer в конструкторе -- это мягкое связывания, ссылка на renderer в index.js, где она передается как параметр конструктора при создании экземпляра класса
    this._items = items; //массив с данными карточек [{image, title, price}, ...]
    this._renderer = renderer; //функция из index.js; она создает новый экземпляр класса карточки, который возвращает разметку карточки, и вставляет ее в контейнер
    this._container = document.querySelector(containerSelector); //доступ к контейнеру, в который вставляется
  }
  addItem(element) { //метод вставляет элемент (из массива) в контейнер
    this._container.append(element);
  };
  clear() { //метод удаляет все содержимое контейнера
    this._container.innerHTML = '';
  }

  renderItems() { //перебирает массив данных карточек и вызывает для каждого функцию renderer
    this.clear(); //вызов метода, который удаляет все содержимое контейнера
    this._items.forEach(item => {
      this._renderer(item); //функция, описанная в index.js; она создает новый экземпляр класса карточки, который возвращает разметку карточки, и вставляет ее в контейнер
    });
  }
}