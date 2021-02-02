/**
 * @class Card
 */
export default class Card {
  /**
   * Add this.card
   *
   * @param {string} message - content card
   */
  addCard(message) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.getMarkup(message);
  }

  /**
   * Get markup for this.card
   *
   * @param {string} message - content card
   */
  getMarkup(message) {
    this.card.innerHTML = `
    <div class="card-content">${message}</div>
    <button class='button button-card-delete'>✗</button>
    <button class='button button-card-deleteConfirm'>Delete ?</button>
    `;
  }

  /**
   * @return this.card
   *
   * @param {string} message - content card
   */
  getCard(message) {
    this.addCard(message);

    return this.card;
  }
}
