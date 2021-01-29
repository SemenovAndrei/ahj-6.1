export default class Card {
  constructor(name) {
    this.name = name;
  }

  addCard() {
    this.card = document.createElement('div');
    this.card.classList.add('card');
  }

  getCard(message) {
    this.addCard();
    this.card.textContent = message;

    return this.card;
  }
}
