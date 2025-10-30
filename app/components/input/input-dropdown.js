import Component from '@ember/component';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';
import { htmlSafe } from '@ember/string';

export default Component.extend({
    willRender() {
        let options = this.get('field.options.options');
        let dropdownOptions = '';
        options.forEach(option => {
            dropdownOptions = dropdownOptions + '<option value=' + option.Key + '>' + option.Value + '</option>';
        });
        this.set('dropdownOptions', htmlSafe(dropdownOptions));
    },

    change() {
        let field = this.get('field');
        let currentValue = null;

        document.getElementById(this.elementId).children[0].classList.remove('required');

        document.getElementsByName(field.id).forEach(input => {
            if (field.options.showAsRadioButtons) {
                currentValue = input.checked ? input.value : currentValue;
            } else {
                currentValue = input.value;
            }
        });

        vssDependency(currentValue, field);

        if (field.id === '10895') {
            // only these two values should show the company address
            let needsCompany = (currentValue === '4000197' || currentValue === '4000198');

            let $btn = jQuery('button[name="useCompanyAddress"]');

            // if we “need” company‐address but the button is still disabled, click it
            if (needsCompany && $btn.prop('disabled')) {
                $btn.click();
            }
            // if we no longer “need” the company address but it’s currently shown, click to hide it
            else if (!needsCompany && !$btn.prop('disabled')) {
                $btn.click();
            }

            // finally toggle “required” on all inputs inside the fieldset
            jQuery('.company-address-fields')
                .find('input, select, textarea')
                .prop('required', needsCompany);
        }
    }
});
