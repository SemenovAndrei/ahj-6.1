import moment from 'moment';

window.moment = moment;

/**
 * @class DateCalendar
 */
export default class DateCalendar {
  /**
   * @constructor
   *
   * @param {class} elements - Elements
   */
  constructor(elements) {
    this.elements = elements;
  }

  /**
   * Init
   */
  init() {
    this.elements.init();
    this.addListeners();
  }

  /**
   * Add listeners
   */
  addListeners() {
    this.elements.container.addEventListener('click', this.logic.bind(this));
  }

  /**
   * Logic actions to click
   *
   * @param {event} e - Click event
   */
  logic(e) {
    // e.preventDefault();
    this.resetTickets();
    this.elements.resetHint();

    if (this.elements.form.querySelector('.field-back-checkbox').checked) {
      this.elements.form.querySelector('.field-back').style.display = 'block';
    } else {
      this.elements.form.querySelector('.field-back').value = '';
      this.elements.form.querySelector('.field-back').style.display = 'none';
    }

    if (this.elements.form.querySelector('.field-back').value) {
      this.checkDateBack();
    }

    if (e.target.classList.contains('field-to')) {
      this.fieldTo = this.elements.form.querySelector('.field-to');
      this.fieldTo.setAttribute('min', moment().format('YYYY-MM-DD'));
      this.fieldTo.value = moment().format('YYYY-MM-DD');
    }

    if (e.target.classList.contains('field-back')) {
      this.elements.resetHint();

      if (this.checkFormTo()) {
        e.preventDefault();
        return;
      }

      this.getFieldBackValue();
    }

    if (e.target.classList.contains('button-sale')) {
      this.elements.resetHint();
      if (this.checkFormTo() || this.checkFormBack()) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      this.showTickets();
    }
  }

  /**
   * Get values to fields form
   *
   */
  getFieldBackValue() {
    const fieldBack = this.elements.form.querySelector('.field-back');
    fieldBack.setAttribute('min', this.fieldTo.value);
  }

  checkDateBack() {
    const fieldBack = this.elements.form.querySelector('.field-back');
    if (this.fieldTo.value > fieldBack.value) {
      fieldBack.value = '';
    }
  }

  /**
   * Check fields form to correct value
   */
  checkFormTo() {
    if (!this.fieldTo) {
      this.elements.showHint('to', 'Нужно заполнить поле');
      return true;
    }

    if (!this.fieldTo.value) {
      this.elements.showHint('to', 'Нет даты');
      return true;
    }

    if (this.fieldTo.value.length > 10) {
      this.elements.showHint('to', 'Неверный год');
      return true;
    }

    if (moment(this.fieldTo.value) > moment().add(180, 'days')) {
      this.elements.showHint('to', 'Неверная дата');
      return true;
    }

    if (moment(this.fieldTo.value).format('L') < moment().format('L')) {
      console.log(moment(this.fieldTo.value));
      console.log(moment());
      this.elements.showHint('to', 'Неверная дата');
      return true;
    }
  }

  /**
   * Check fields form to correct value
   */
  checkFormBack() {
    if (!this.elements.form.querySelector('.field-back-checkbox').checked) {
      return;
    }

    const fieldBack = this.elements.form.querySelector('.field-back');

    if (!fieldBack.value) {
      this.elements.showHint('back', 'Нужно заполнить поле');
      return true;
    }
  }

  /**
   * Show tickets value on page
   */
  showTickets() {
    if (this.fieldTo.value) {
      this.elements.form.querySelector('.ticket-to').innerHTML = `Билет туда: <span class="ticket-value">${this.fieldTo.value}</span>`;
    }

    if (this.elements.form.querySelector('.field-back').value) {
      const ticketBack = this.elements.form.querySelector('.ticket-back');
      ticketBack.innerHTML = `Билет обратно: <span class="ticket-value">${this.elements.form.querySelector('.field-back').value}</span>`;
    }
    this.elements.form.querySelector('.field-back').value = '';
    this.fieldTo.value = '';
    this.fieldTo = null;
  }

  /**
   * Reset tickets value
   */
  resetTickets() {
    this.elements.form.querySelector('.ticket-to').textContent = '';
    this.elements.form.querySelector('.ticket-back').textContent = '';
  }
}
