import Component from '@ember/component';
import { dateGreaterNow } from 'kursausschreibung/framework/date-helpers';
import { formDanger } from 'kursausschreibung/helpers/form';

export default Component.extend({
    change() {
        if (this.field.id === 'Birthdate') {
            formDanger(this.element.children[0], dateGreaterNow(this.element.children[0].value));
        }
    },
});
