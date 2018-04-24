import { helper } from '@ember/component/helper';
import { getString } from 'kursausschreibung/framework/translate';
import { htmlSafe } from '@ember/string';

export function translate([key]) {
  return htmlSafe(getString(key));
}

export default helper(translate);
