import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ListIndexController extends Controller {
  page = 1;
  queryParams = ['page'];

  @action
  queryChanged() {
    // reset page
    this.page = 1;
  }
}
