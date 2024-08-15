import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class subscribeController extends Controller {
  @service router;
  @action
  subscribe() {
      this.router.transitionTo('list.category.event.confirmation');
    }
};
