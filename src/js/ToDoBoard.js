/**
 * @class ToDoBoard
 */
export default class ToDoBoard {
  constructor(elements) {
    this.elements = elements;
    this.storage = localStorage;
    this.allCards = {};
  }

  /**
   * init
   */
  init() {
    this.elements.init();
    this.addListeners();
    this.loadCards();
  }

  addListeners() {
    this.elements.container.addEventListener('click', this.clickLogic.bind(this));
  }

  clickLogic(e) {
    e.preventDefault();

    this.elements.resetButtonsDelete();

    if (e.target.classList.contains('button-add')) {
      this.elements.showForm(e.target);
    }

    if (e.target.classList.contains('button-form-add')) {
      this.elements.addCard(e.target);
    }

    if (e.target.classList.contains('button-form-cancel')) {
      this.elements.resetView();
    }

    if (e.target.classList.contains('button-card-delete')) {
      this.elements.showConfirmDelete(e.target);
    }

    if (e.target.classList.contains('button-card-deleteConfirm')) {
      this.elements.constructor.deleteCard(e.target);
    }

    this.saveCards();
  }

  clearStorage() {
    this.storage.removeItem('boardToDo');
  }

  saveCards() {
    const columns = this.elements.board.getElementsByClassName('column');
    columns.forEach((e) => {
      this.allCards[e.dataset.column] = [];
    });

    const cardsContent = this.elements.board.getElementsByClassName('card-content');
    cardsContent.forEach((e) => {
      const column = e.closest('.column');
      this.allCards[column.dataset.column].push(e.textContent);
    });

    if (this.storage.getItem('boardToDo')) {
      this.clearStorage();
    }

    this.storage.setItem('boardToDo', JSON.stringify(this.allCards));
  }

  loadCards() {
    if (!this.storage.getItem('boardToDo')) {
      return;
    }

    this.allCards = JSON.parse(this.storage.getItem('boardToDo'));
    console.log(this.allCards);

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(this.allCards)) {
      this.elements.addAllCards(key, value);
    }
  }
}
