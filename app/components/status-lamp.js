import Component from '@ember/component';
import { observer } from '@ember/object';
import { getString } from '../framework/translate';

const statuses = {
  green: { tooltip: getString('freeSeatsAvailable'), className: 'lamp-green' },
  yellow: { tooltip: getString('deadlineExpired'), className: 'lamp-yellow' },
  red: { tooltip: getString('noFreeSeats'), className: 'lamp-red' },
  orange: { tooltip: getString('notAvailableOnline'), className: 'lamp-orange' }
};

export default Component.extend({
  init() {
    this._super();
    // trigger observer
    this.statusChanged();
  },

  statusChanged: observer('status', function () {
    let status = statuses[this.get('status')];

    if (status !== undefined) {
      this.set('tooltip', status.tooltip);
      this.set('classNames', [status.className]);
    }
  }),

  tagName: 'span',
  attributeBindings: ['tooltip:uk-tooltip']
});
