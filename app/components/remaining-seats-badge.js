import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';
import settings from 'kursausschreibung/framework/settings';

export default class RemainingSeatsBadgeComponent extends Component {
  intervalId;

  constructor(owner, args) {
    super(owner, args);

    const event = this.args.event;
    event?.update?.();

    let interval =
      typeof settings.badgeFreeSeats === 'object'
        ? settings.badgeFreeSeats.intervalSec
        : null;

    if (typeof interval !== 'number') {
      console.warn(
        'settings.badgeFreeSeats.intervalSec not found. falling back to 30 seconds'
      ); // eslint-disable-line no-console
      interval = 30;
    }

    this.intervalId = setInterval(() => event?.update?.(), interval * 1000);
    registerDestructor(this, () => clearInterval(this.intervalId));
  }

  get hidden() {
    const freeSeats = this.args.event?.FreeSeats;
    const status = this.args.event?.status;
    const subscriptionYellowDisable =
      typeof settings.badgeFreeSeats === 'object'
        ? settings.badgeFreeSeats.subscriptionYellowDisable
        : false;

    return (
      freeSeats === null || (subscriptionYellowDisable && status === 'yellow')
    );
  }

  get labelType() {
    return this.args.event?.FreeSeats > 5 ? 'warning' : 'danger';
  }

  get plural() {
    return this.args.event?.FreeSeats !== 1;
  }
}
