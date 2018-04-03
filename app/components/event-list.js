import Component from '@ember/component';

export default Component.extend({
  actions: {
    queryChanged(query) {
      this.sendAction('queryChanged', query);
    }
  }
});
