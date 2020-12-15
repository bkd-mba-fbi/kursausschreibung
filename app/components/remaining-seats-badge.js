import Component from '@ember/component';
import { computed } from "@ember/object";
import settings from 'kursausschreibung/framework/settings';

export default Component.extend({
  init() {
    this._super(...arguments);

    let event = this.get('event');

    event.update();

    let interval = typeof settings.badgeFreeSeats === 'object' ?
      settings.badgeFreeSeats.intervalSec : null;

    if (typeof interval !== 'number') {
      console.warn('settings.badgeFreeSeats.intervalSec not found. falling back to 30 seconds'); // eslint-disable-line no-console
      interval = 30;
    }

    // update freeSeats every <interval> seconds
    this.set('interval', setInterval(() => event.update(), interval * 1000));

  },

  willDestroyElement() {
    let interval = this.get('interval');

    if (interval !== undefined)
      clearInterval(interval);
  },

  hidden: computed('event.{FreeSeats,status}', function () {
    let freeSeats = this.get('event.FreeSeats');
    let status = this.get('event.status');
    let subscriptionYellowDisable = typeof settings.badgeFreeSeats === 'object' ?
      settings.badgeFreeSeats.subscriptionYellowDisable : false;

    return freeSeats === null || (subscriptionYellowDisable && status === 'yellow');
  }),

  labelType: computed('event.FreeSeats', function () {
    return this.get('event.FreeSeats') > 5 ? 'warning' : 'danger';
  }),

  plural: computed('event.FreeSeats', function () {
    return this.get('event.FreeSeats') !== 1;
  })
});
