import Component from '@ember/component';
import { observer } from "@ember/object";

// TODO: move this to config
const statuses = {
  green: { tooltip: 'Freie Plätze vorhanden', className: 'lamp-green' },
  yellow: { tooltip: 'Anmeldefrist abgelaufen', className: 'lamp-yellow' },
  red: { tooltip: 'Alle Plätze belegt', className: 'lamp-red' },
  orange: { tooltip: 'Anmeldung im Internet nicht möglich', className: 'lamp-orange' }
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
