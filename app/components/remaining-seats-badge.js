import Component from '@ember/component';
import { computed } from "@ember/object";
import { getEvent } from 'kursausschreibung/framework/api';
import settings from 'kursausschreibung/framework/settings';

export default Component.extend({
  init() {
    this._super(...arguments);

    let event = this.get('event');
    let eventId = event.Id;

    // set the initial value
    if (event.FreeSeats === null)
      return;
    this.set('remainingSeats', event.FreeSeats);

    // frequently update remaining seats
    let updateFreeSeats = () => {
      getEvent(eventId).then(event => {

        this.set('remainingSeats', event.FreeSeats);

        if (event.FreeSeats === null)
          throw new Error('FreeSeats not available');

      }).catch(() => {

        clearInterval(this.get('interval'));

        this.set('interval', undefined);
        this.set('remainingSeats', null);

      });
    };
    updateFreeSeats();

    let interval = typeof settings.badgeFreeSeats === 'object' ?
      settings.badgeFreeSeats.intervalSec : null;

    if (typeof interval !== 'number') {
      console.warn('settings.badgeFreeSeats.intervalSec not found. falling back to 30 seconds');
      interval = 30;
    }

    this.set('interval', setInterval(updateFreeSeats, interval * 1000));

  },

  willDestroyElement() {
    let interval = this.get('interval');

    if (interval !== undefined)
      clearInterval(interval);
  },

  remainingSeats: null,

  hidden: computed('remainingSeats', function () {
    return this.get('remainingSeats') === null;
  }),

  labelType: computed('remainingSeats', function () {
    return this.get('remainingSeats') > 5 ? 'warning' : 'danger';
  }),

  plural: computed('remainingSeats', function () {
    return this.get('remainingSeats') > 1;
  })
});
