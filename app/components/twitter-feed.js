import Component from '@ember/component';
import settings from '../framework/settings';
import { getLanguage } from '../framework/translate';

export default Component.extend({
  language: getLanguage().split('-')[0]
}).reopenClass({
  positionalParams: ['username']
});
