import Component from '@ember/component';
import { observer } from '@ember/object';
import { getString } from 'kursausschreibung/framework/translate';

const statuses = {
  green: { tooltip: getString('greenLamp'), className: 'lamp-green', icon: 'pencil' },
  chartreuse: { tooltip: getString('chartreuseLamp'), className: 'lamp-chartreuse', icon: 'check' },
  yellow: { tooltip: getString('yellowLamp'), className: 'lamp-yellow', icon: 'clock' },
  red: { tooltip: getString('redLamp'), className: 'lamp-red', icon: 'close' },
  orange: { tooltip: getString('orangeLamp'), className: 'lamp-orange', icon: 'ban' }
};

export default Component.extend({
  init() {
    this._super(...arguments);
    // trigger observer
    this.statusChanged();
  },

  statusChanged: observer('status', function () {
    let status = statuses[this.get('status')];

    if (status !== undefined) {
      this.set('tooltip', status.tooltip);
      this.set('color', status.className);
      this.set('icon', status.icon);
    }
  }),

  tagName: 'span',
  attributeBindings: ['tooltip:data-uk-tooltip',"icon:uk-icon"],
  classNames: ['status-lamp','icon-lamp'],
  classNameBindings: ['color']
});
