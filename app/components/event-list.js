import Component from '@ember/component';

export default Component.extend({
  actions: {
    queryChanged(query) {
      this.get('queryChanged')(query);
    }
  }
});
