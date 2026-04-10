import Component from '@ember/component';
import { computed } from '@ember/object';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  dropdownOptions: computed('field.options.options.[]', function () {
    let options = this.field.options.options;
    let dropdownOptions = '';
    options.forEach((option) => {
      dropdownOptions =
        dropdownOptions +
        '<option value=' +
        option.Key +
        '>' +
        option.Value +
        '</option>';
    });
    return htmlSafe(dropdownOptions);
  }),

  change() {
    let field = this.field;
    let currentValue = null;

    document
      .getElementById(this.elementId)
      .children[0].classList.remove('required');

    document.getElementsByName(field.id).forEach((input) => {
      if (field.options.showAsRadioButtons) {
        currentValue = input.checked ? input.value : currentValue;
      } else {
        currentValue = input.value;
      }
    });

    vssDependency(currentValue, field);

    if (field.id === '10895') {
      // only these two values should show the company address
      let needsCompany =
        currentValue === '4000197' || currentValue === '4000198';

      let companyAddressButton = document.querySelector(
        'button[name="useCompanyAddress"]'
      );

      // if we “need” company‐address but the button is still disabled, click it
      if (needsCompany && companyAddressButton?.disabled) {
        companyAddressButton.click();
      }
      // if we no longer “need” the company address but it’s currently shown, click to hide it
      else if (!needsCompany && companyAddressButton?.disabled === false) {
        companyAddressButton.click();
      }

      // finally toggle “required” on all inputs inside the fieldset
      document
        .querySelectorAll(
          '.company-address-fields input, .company-address-fields select, .company-address-fields textarea'
        )
        .forEach((element) => {
          element.required = needsCompany;
        });
    }
  },
});
