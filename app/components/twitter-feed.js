import Component from '@ember/component';
import { getLanguage } from 'kursausschreibung/framework/translate';

export default Component.extend({
  language: getLanguage().split('-')[0]
}).reopenClass({
  positionalParams: ['username']
});
