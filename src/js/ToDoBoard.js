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
    this.elements.board.addEventListener('mousedown', this.mousedown.bind(this));
    this.elements.board.addEventListener('mousemove', this.mousemove.bind(this));
    this.elements.board.addEventListener('mouseleave', this.mouseleave.bind(this));
    this.elements.board.addEventListener('mouseup', this.mouseup.bind(this));
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

  mousedown(e) {
    if (!e.target.closest('.card')) {
      return;
    }

    e.preventDefault();

    this.dragEl = e.target.closest('.card');
    this.ghostEl = e.target.cloneNode(true);
    this.ghostEl.classList.add('dragged');
    this.elements.container.appendChild(this.ghostEl);
    this.ghostEl.style.left = `${e.pageX - this.ghostEl.offsetWidth / 2}px`;
    this.ghostEl.style.top = `${e.pageY - this.ghostEl.offsetHeight / 2}px`;
  }

  mousemove(e) {
    if (!this.dragEl) {
      return;
    }

    e.preventDefault();

    this.ghostEl.style.left = `${e.pageX - this.ghostEl.offsetWidth / 2}px`;
    this.ghostEl.style.top = `${e.pageY - this.ghostEl.offsetHeight / 2}px`;
  }

  mouseup(e) {
    if (!this.dragEl) {
      return;
    }

    if (e.target.closest('.content')) {
      const closest = document.elementFromPoint(e.clientX, e.clientY).closest('.card');
      console.log(this.dragEl);
      e.target.closest('.content').insertBefore(this.dragEl, closest);
      this.saveCards();
    }

    this.elements.container.removeChild(this.ghostEl);
    this.dragEl = null;
    this.ghostEl = null;
  }

  mouseleave() {
    if (!this.dragEl) {
      return;
    }

    this.elements.container.removeChild(this.ghostEl);
    this.dragEl = null;
    this.ghostEl = null;
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

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(this.allCards)) {
      this.elements.addAllCards(key, value);
    }
  }
}
