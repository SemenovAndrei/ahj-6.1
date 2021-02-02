/* eslint-disable prefer-destructuring */
/**
 * @class Elements
 */
export default class Elements {
  constructor(board, card, form) {
    this.board = board.getBoard();
    this.card = card;
    this.form = form;
    this.body = document.getElementsByTagName('body')[0];
  }

  /**
   * Init
   */
  init() {
    this.addElements();
    this.body.insertAdjacentElement('afterbegin', this.container);
    this.container.appendChild(this.board);
  }

  /**
   * Add all elements
   */
  addElements() {
    this.addContainer();
  }

  /**
   * Add container
   */
  addContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
  }

  /**
   * Hide form
   */
  hideForm() {
    const wrappersForm = this.container.getElementsByClassName('wrapper-form');
    wrappersForm.forEach((e) => {
      e.innerHTML = '';
    });
  }

  /**
   * Reset buttons add card
   */
  resetButtonsAdd() {
    const buttons = this.container.getElementsByClassName('button-add');
    buttons.forEach((e) => {
      e.style.display = 'block';
    });
  }

  /**
   * Functions hideForm & resetButtonsAdd
   */
  resetView() {
    this.hideForm();
    this.resetButtonsAdd();
  }

  /**
   * Show form on page
   *
   * @param {element} e - element to show
   */
  showForm(e) {
    this.resetView();

    e.style.display = 'none';
    e.nextElementSibling.appendChild(this.form.getForm());
    this.board.querySelector('.form-message').focus();
  }

  /**
   * Add card to page
   *
   * @param {element} e - element to addCard
   */
  addCard(e) {
    const message = e.closest('.form').querySelector('.form-message').value;

    if (!message.trim()) {
      this.board.querySelector('.form-message').focus();

      return;
    }

    e.closest('.column').querySelector('.content').appendChild(this.card.getCard(message));

    this.resetView();
  }

  /**
   * Add all saved cards to page
   *
   * @param {string} name - column name
   * @param {array} array - array cards
   */
  addAllCards(name, array) {
    const column = this.board.querySelector(`[data-column=${name}]`);
    const content = column.querySelector('.content');

    array.forEach((e) => {
      content.appendChild(this.card.getCard(e));
    });
  }

  /**
   * Reset buttons delete
   */
  resetButtonsDelete() {
    const buttons = this.container.getElementsByClassName('button-card-delete');
    buttons.forEach((e) => {
      e.removeAttribute('style');
    });

    const buttonsConfirm = this.container.getElementsByClassName('button-card-deleteConfirm');
    buttonsConfirm.forEach((e) => {
      e.style.display = 'none';
    });
  }

  /**
   * Show confirm delete
   *
   * @param {element} e - element button confirm delete
   */
  showConfirmDelete(e) {
    this.resetButtonsDelete();

    e.style.display = 'none';
    e.nextElementSibling.style.display = 'block';
  }

  /**
   * Delete card from page
   *
   * @param {element} e - element to delete
   */
  static deleteCard(e) {
    const content = e.closest('.content');
    content.removeChild(e.closest('.card'));
  }

  /**
   * Show hint on field
   */
  showHint(e, message) {
    const parent = this.form.querySelector(`.field-${e}`);

    const hint = parent.nextElementSibling;

    hint.textContent = message;
    hint.style.top = `${parent.closest('.label').getBoundingClientRect().top - 10}px`;
    hint.style.left = `${parent.getBoundingClientRect().right - hint.getBoundingClientRect().width}px`;
    hint.classList.add('hint-active');
  }

  /**
   * Hide hints
   */
  resetHint() {
    const hints = this.form.querySelectorAll('.hint');
    hints.forEach((e) => {
      e.textContent = '';
      e.classList.remove('hint-active');
    });
  }
}
