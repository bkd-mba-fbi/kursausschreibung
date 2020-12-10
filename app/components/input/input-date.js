import Component from '@ember/component';
import { dateGreaterNow } from 'kursausschreibung/framework/date-helpers';
import { formFieldError } from 'kursausschreibung/framework/form-helpers';

export default Component.extend({
    change() {
        if (this.field.id === 'Birthdate') {
            formFieldError(this.element.children[0], dateGreaterNow(this.element.children[0].value));
        }
    },
});
