/**
 * @class ToDoBoard
 */
export default class ToDoBoard {
  constructor(elements) {
    this.elements = elements;
  }

  /**
   * init
   */
  init() {
    this.elements.init();
    this.addListeners();
  }

  addListeners() {
    this.elements.container.addEventListener('click', this.clickLogic.bind(this));
  }

  clickLogic(e) {
    e.preventDefault();

    if (e.target.classList.contains('button-add')) {
      this.elements.showForm(e.target);
    }
  }

  addCard(e) {
    console.log(10);
  }
}
