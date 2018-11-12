import { helper } from '@ember/component/helper';
import { getString } from 'kursausschreibung/framework/translate';
import { htmlSafe } from '@ember/string';

export function translate([key, ...placeholderValues]) {
  return htmlSafe(getString(key, placeholderValues));
}

export default helper(translate);
