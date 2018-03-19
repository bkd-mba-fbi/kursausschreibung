import Component from '@ember/component';
import { computed } from "@ember/object";
import { isInSubscriptionRange } from '../framework/date-helpers';

export default Component.extend({
  tagName: 'li',

  status: computed('event', function () {
    // see "Event Status Definition" in documentation
    if (this.get('event.AllowSubscriptionInternetByStatus') === true) {
      if (isInSubscriptionRange(this.get('event'))) {
        if (this.get('event.FreeSeats') > 0) {
          return 'green';
        } else {
          return 'red';
        }
      }
      return 'yellow';
    } else {
      return 'orange';
    }
  })
});
