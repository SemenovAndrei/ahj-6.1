/**
 * @class ToDoBoard
 */
export default class ToDoBoard {
  constructor(elements) {
    this.elements = elements;
    this.storage = localStorage;
    this.allCards = {};
    this.funcMouseEnter = this.mouseenter.bind(this);
  }

  /**
   * init
   */
  init() {
    this.resetEl();
    this.elements.init();
    this.loadCards();
    this.addListeners();
  }

  addListeners() {
    this.elements.container.addEventListener('click', this.clickLogic.bind(this));
    this.elements.board.addEventListener('mousedown', this.mousedown.bind(this));
    this.elements.board.addEventListener('mousemove', this.mousemove.bind(this));
    this.elements.board.addEventListener('mouseleave', this.mouseleave.bind(this));
    this.elements.board.addEventListener('mouseup', this.mouseup.bind(this));
    this.addContentsListener();
  }

  addContentsListener() {
    const cards = this.elements.board.querySelectorAll('.content');

    cards.forEach((e) => {
      e.addEventListener('mouseover', this.funcMouseEnter);
    });
  }

  resetEl() {
    this.dragEl = null;
    this.testEl = null;
    this.ghostEl = null;
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

    if (e.target.classList.contains('button-card-delete')) {
      return;
    }

    if (e.target.classList.contains('button-card-deleteConfirm')) {
      return;
    }

    e.preventDefault();

    this.dragEl = e.target.closest('.card');

    this.testEl = this.dragEl.cloneNode(true);
    this.testEl.classList.add('test');

    this.ghostEl = this.dragEl.cloneNode(true);
    this.ghostEl.style.width = `${this.dragEl.offsetWidth}px`;
    this.ghostEl.classList.add('dragged');

    this.elements.container.appendChild(this.ghostEl);
    this.ghostEl.style.left = `${e.pageX}px`;
    this.ghostEl.style.top = `${e.pageY - this.ghostEl.offsetHeight / 2}px`;

    this.saveDragElPosition();

    // this.ghostEl.style.cursor = 'grabbing';
  }

  saveDragElPosition() {
    this.parent = this.dragEl.closest('.content');
    this.sibling = this.dragEl.nextElementSibling;
    this.parent.removeChild(this.dragEl);
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

    if (!this.elements.board.querySelector('.test')) {
      this.elements.container.removeChild(this.ghostEl);
      this.resetEl();
      return;
    }

    if (e.target.closest('.content')) {
      this.testEl.classList.remove('test');

      this.saveCards();
    } else {
      this.testEl.closest('.content').removeChild(this.testEl);
      this.parent.insertBefore(this.dragEl, this.sibling);
    }

    this.elements.container.removeChild(this.ghostEl);
    this.resetEl();
  }

  mouseleave() {
    if (!this.dragEl) {
      return;
    }

    this.testEl.closest('.content').removeChild(this.testEl);
    this.elements.container.removeChild(this.ghostEl);
    this.parent.insertBefore(this.dragEl, this.sibling);

    this.resetEl();
  }

  mouseenter(e) {
    if (!this.ghostEl) {
      return;
    }

    if (!e.target.closest('.content').hasChildNodes()) {
      e.target.closest('.content').appendChild(this.testEl);
    }

    const closestEl = e.target.closest('.card');

    if (!closestEl) {
      return;
    }

    const { top } = closestEl.getBoundingClientRect();
    if (e.pageY > window.scrollY + top + closestEl.offsetHeight / 2) {
      e.target.closest('.content').insertBefore(this.testEl, closestEl.nextElementSibling);
    } else {
      e.target.closest('.content').insertBefore(this.testEl, closestEl);
    }
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
