/**
 * @class Board
 */
export default class Board {
  constructor() {
    this.board = null;
  }

  /**
   * Add board to this
   */
  addBoard() {
    this.board = document.createElement('div');
    this.board.classList.add('board');
    this.getMarkup();
  }

  /**
   * Add marker to this.board
   */
  getMarkup() {
    this.board.innerHTML = `
    <div class="column column-todo" data-column='todo'>
      <h2 class="title">todo</h2>
      <div class="content"></div>
      <button class="button button-add">Add another card</button>
      <div class="wrapper-form"></div>
    </div>
    <div class="column column-in-progress" data-column='inProgress'>
      <h2 class="title">in progress</h2>
      <div class="content"></div>
      <button class="button button-add">Add another card</button>
      <div class="wrapper-form"></div>
    </div>
    <div class="column column-done" data-column='done'>
      <h2 class="title">done</h2>
      <div class="content"></div>
      <button class="button button-add">Add another card</button>
      <div class="wrapper-form"></div>
    </div>
    `;
  }

  /**
   * @return this.board
   */
  getBoard() {
    this.addBoard();

    return this.board;
  }
}
