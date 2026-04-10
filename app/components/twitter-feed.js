import Component from '@glimmer/component';
import { getLanguage } from 'kursausschreibung/framework/translate';

export default class TwitterFeedComponent extends Component {
  get language() {
    return getLanguage().split('-')[0];
  }
}
