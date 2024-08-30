import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import $ from 'jquery';
import { scrollToTimeout, setOffsetStickyHeader } from 'kursausschreibung/framework/scroll-helpers';

let rootElement = $(config.APP.rootElement).get(0);

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  init(){
    this.on('routeDidChange', transition => {
      this._super(...arguments);

      var subscriptionProcessId = 'subscriptionProcess';
  
      setInterval(function () {
        if (document.getElementById(subscriptionProcessId) !== null) {
          setOffsetStickyHeader(subscriptionProcessId);
        }
      }, 1000);

      if (this.currentPath === 'list.category.event.subscribe') {
        scrollToTimeout(subscriptionProcessId);
      } else if (this.currentPath !== 'list.category' && screen.width <= 960) {
        scrollToTimeout('headerCategory');
      } else if (this.currentPath !== 'list.index') {
        scrollToTimeout(rootElement.id);
      }
    });
  }
});

Router.map(function () {
  this.route('permalink', { path: '/uid/:event_id' });
  this.route('list', { path: '/:area_of_education' }, function () {
    this.route('category', { path: '/:category' }, function () {
      this.route('event', { path: '/:event_id' }, function () {
        this.route('subscribe');
        this.route('confirmation-error');
        this.route('confirmation');
      });
    });
  });
});

export default Router;
