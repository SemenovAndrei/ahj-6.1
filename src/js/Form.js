/**
 * @class Form
 */
export default class Form {
  /**
   * Init
   */
  init() {
    this.addElements();
  }

  /**
   * Add all elements
   */
  addElements() {
    this.addForm();
  }

  /**
   * Add form
   */
  addForm() {
    this.form = document.createElement('form');
    this.form.classList.add('form');
    this.addFormMarkup();
  }

  /**
   * Add markup to form
   */
  addFormMarkup() {
    this.form.innerHTML = `
    <textarea class="form-message" rows='5'></textarea>
    <div class="form-controls">
      <button class="button button-form button-form-add">Add Card</button>
      <button class="button button-form button-form-cancel">✗</button>
    </div>
    `;
  }

  /**
   * @return this.form
   */
  getForm() {
    this.init();

    return this.form;
  }
}
