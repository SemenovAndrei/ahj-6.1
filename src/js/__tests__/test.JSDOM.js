import Form from '../Form';
import Elements from '../Elements';
import DateCalendar from '../DateCalendar';

const form = new Form();

const elements = new Elements(form);

const dateCalendar = new DateCalendar(elements);
dateCalendar.init();

describe('test DateCalendar', () => {
  test('to', () => {
    const fieldTo = document.querySelector('.field-to');
    fieldTo.click();

    const result = dateCalendar.fieldTo.value;

    const buttonSale = document.querySelector('.button-sale');
    buttonSale.click();
    expect(dateCalendar.elements.form.querySelector('.ticket-to').textContent).toBe(`Билет туда: ${result}`);
  });
});
