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

  hideForm() {
    const wrappersForm = this.container.getElementsByClassName('wrapper-form');
    wrappersForm.forEach((e) => {
      e.innerHTML = '';
    });
  }

  resetButtonsAdd() {
    const wrappersForm = this.container.getElementsByClassName('button-add');
    wrappersForm.forEach((e) => {
      e.style.display = 'block';
    });
  }

  showForm(e) {
    this.hideForm();
    this.resetButtonsAdd();
    e.style.display = 'none';
    e.nextElementSibling.appendChild(this.form.getForm());
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
