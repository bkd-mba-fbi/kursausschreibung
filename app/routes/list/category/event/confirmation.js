import Route from '@ember/routing/route';
import storage from 'kursausschreibung/framework/storage';

export default Route.extend({
  model() {
    let eventId = this.modelFor('list.category.event').get('Id');

    return storage.localStoreItem('kursausschreibung.tableData.' + eventId);
  }
});
