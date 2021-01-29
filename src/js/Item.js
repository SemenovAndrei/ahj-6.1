/**
 * @class Item
 */
export default class Item {
  /**
   * init
   *
   * @param {object} item - Item object
   */
  init(item) {
    this.addElements(item);
  }

  /**
   * Add all elements
   */
  addElements(item) {
    this.addItem(item);
  }

  /**
   * Add item to current
   *
   * @param {object} item - Item object
   */
  addItem(item) {
    this.item = document.createElement('div');
    this.item.dataset.id = item.id;
    this.item.classList.add('item');
    this.addItemMarkup(item);
  }

  /**
   * Add markup to item
   *
   * @param {object} item - Item object
   */
  addItemMarkup(item) {
    this.item.innerHTML = `
    <div class="cell item-title">${item.title}</div>
    <div class="cell item-price">${item.price}</div>
    <div class="cell item-controls">
      <button class="button button-content button-edit" title="edit">✎</button>
      <button class="button button-content button-delete" title="delete">❌</button>
      <button class="button button-content button-really-delete" title="really-delete">Удалить?</button>
    </div>
    `;
  }

  /**
   * @return this.item
   *
   * @param {object} item - Item object
   */
  getItem(item) {
    this.init(item);

    return this.item;
  }
}
