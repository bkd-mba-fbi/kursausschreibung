import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  didTransition() {
    this._super(...arguments);
    window.scrollTo(0, 0);
  }
});

Router.map(function() {
  this.route('list', { path: '/:area_of_education' }, function() {
    this.route('category', { path: '/:category' }, function() {
      this.route('event', { path: '/:event_id' }, function() {
        this.route('subscribe');
        this.route('confirmation');
      });
    });
  });
});

export default Router;
